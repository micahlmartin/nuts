var _                 = require('lodash');
var fs                = require('fs');
var Hapi              = require('hapi');
var parseDBUrl        = require('parse-database-url');
var path              = require('path');
var Q                 = require('q');
var requireDirectory  = require('require-directory');
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

  Nuts.settings = settings;
}

var setupDatabase = function() {
  Nuts.mongoose = require('./db').connect();
}

var initializeServer = function() {
  Nuts.server = new Hapi.Server('0.0.0.0', Nuts.settings.port)
  Nuts.server.views({
    helpersPath: "./app/helpers",
    partialsPath: "./app/views",
    isCached: false,
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
  setupDatabase()
  loadModels();
  loadPlugins();
  loadEnvironment();
  loadInitializers();
  loadActions();
  deferred.resolve();

  return deferred.promise;
}


var loadPlugins = function() {
  plugins = []
  _.forOwn(requireDirectory(module, './plugins'), function(value, key) {
    plugins.push(value);
  })

  Nuts.server.pack.register(plugins, function(err) {
    if(err) {
      console.log('error', err)
    } else {
      console.log('info', 'Plugins registered successfully.');
    }
  });
}

var loadModels = function() {
  Nuts.models = requireDirectory(module, '../app/models');
  console.log('info', "Models loaded successfully");
}

var loadInitializers = function() {
  requireDirectory(module, './initializers');
  console.log('info', 'Initializers loaded successfully');
}

var loadRoutes = function() {
  Nuts.server.route(require('./routes'));
  console.log('info', 'Routes loaded successfully');
}

var loadEnvironment = function() {
  Nuts.environment = Nuts.environment;
  require('./environments/' + Nuts.environment);
}

var loadActions = function() {
  Nuts.actions = requireDirectory(module, '../app/actions');
  console.log('info', "Actions loaded successfully");
}

var startServer = function() {
  console.log("Starting server")
  Nuts.server.start(function () {
    console.log('info', "Started server on port " + Nuts.settings.port);
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
