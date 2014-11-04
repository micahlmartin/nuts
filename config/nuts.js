var _                 = require('lodash');
var fs                = require('fs');
var Hapi              = require('hapi');
var parseDBUrl        = require('parse-database-url');
var path              = require('path');
var Q                 = require('q');
var requireDirectory  = require('require-directory');
var Sequelize         = require("sequelize");
var yml               = require('js-yaml');
var nodeJSX           = require('node-jsx');

nodeJSX.install();

var initializeSettings = function() {
  // Initialize the global container
  GLOBAL.Nuts = {
    environment: (process.env.NODE_ENV || 'development'),
    root: path.normalize(__dirname + '/../'),
  };

  // Convenience method
  Nuts.isDevelopment = Nuts.environment == 'development';

  // Load settings.yml and parse it as a lodash template
  renderedSettingsTemplate = _.template(fs.readFileSync(path.join(Nuts.root, 'config/settings.yml')), {})

  // Parse the settings as a yml file
  settingsYml = yml.safeLoad(renderedSettingsTemplate);

  // Only get the settings for the current environment
  settings = settingsYml[Nuts.environment];

  // Override the database settings
  if(process.env.DATABASE_URL) {
    settingsFromUrl = parseDBUrl(process.env.DATABASE_URL);
    settingsFromUrl.dialect = settingsFromUrl.driver;
    delete settingsFromUrl['driver'];
    settings.database = _.merge(settings.database, settingsFromUrl);
  }

  Nuts.settings = settings;
}

var setupDatabase = function() {
  var deferred = Q.defer();

  defaultDBSettings = {
    define: {
      timestamps: true
    }
  }

  dbSettings = Nuts.settings.database;

  sequelizeConfig = _.merge(defaultDBSettings, dbSettings);

  var sequelize = new Sequelize(dbSettings.database, dbSettings.user, dbSettings.password, sequelizeConfig);

  sequelize.authenticate().complete(function(err) {
    if(!!err) {
      console.error('error', err);
      deferred.reject(err);
    } else {
      console.log('Successfully connected to the database.');
      Nuts.sequelize = sequelize;
      deferred.resolve();
    }
  })

  return deferred.promise;
}

var initializeServer = function() {
  Nuts.server = new Hapi.Server('0.0.0.0', Nuts.settings.port)
  Nuts.server.views({
    helpersPath: "./app/helpers",
    partialsPath: "./app/views",
    isCached: !Nuts.isDevelopment,
    engines: {
      jsx: {
        compileMode: "async",
        path: "app/assets/javascript",
        module: {
          compile: function(template, options, next) {
            var component = require('../' + options.filename);
            return next(null, function(context, options, callback) {
              var renderedView = require('react').renderToString(component(context));
              callback(null, renderedView);
            });
          }
        }
      },
      hbs: {
        path: "app/views",
        module: require('handlebars')
      }
    }
  });
}

var commonConfiguration = function() {
  var deferred = Q.defer();

  initializeSettings();
  initializeServer();
  setupDatabase().then(function() {
    loadModels();
    loadPlugins();
    loadEnvironment();
    loadInitializers();
    loadActions();
    deferred.resolve();
  }).fail(function(err) {
    deferred.reject(err);
  });

  return deferred.promise;
}


var loadPlugins = function() {
  plugins = []
  _.forOwn(requireDirectory(module, './plugins'), function(value, key) {
    plugins.push(value);
  })

  Nuts.server.pack.register(plugins, function(err) {
    if(err) {
      Nuts.server.log('error', err)
    } else {
      Nuts.server.log('info', 'Plugins registered successfully.');
    }
  });
}

var loadModels = function() {
  Nuts.models = requireDirectory(module, '../app/models');
  Nuts.server.log('info', "Models loaded successfully");
}

var loadInitializers = function() {
  requireDirectory(module, './initializers');
  Nuts.server.log('info', 'Initializers loaded successfully');
}

var loadRoutes = function() {
  Nuts.server.route(require('./routes'));
  Nuts.server.log('info', 'Routes loaded successfully');
}

var loadEnvironment = function() {
  Nuts.environment = Nuts.environment;
  require('./environments/' + Nuts.environment);
}

var loadActions = function() {
  Nuts.actions = requireDirectory(module, '../app/actions');
  Nuts.server.log('info', "Actions loaded successfully");
}

var startServer = function() {
  Nuts.server.start(function () {
    Nuts.server.log('info', "Started server on port " + Nuts.settings.port);
  });
}

module.exports = {
  configure: commonConfiguration,
  console: function() {
    commonConfiguration().then(function() {
      var repl  = require('repl');
      var util  = require('util');
      var eyes  = require('eyes');
      var moment = require('moment');

      // open the repl session
      var replServer = repl.start({
        prompt: util.format("%s (%s) > ", Nuts.settings.app_name, Nuts.environment)
      });

      replServer.context.moment = moment;
    }).fail(function(err) {
      process.exit(1);
    });
  },
  deez: function() {
    commonConfiguration().then(function(){
      loadRoutes();
      startServer();
    }).fail(function(err) {
      process.exit(1);
    });
  }
}
