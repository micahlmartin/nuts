var _                 = require('lodash');
var fs                = require('fs');
var Hapi              = require('hapi');
var parseDBUrl        = require('parse-database-url');
var path              = require('path');
var Q                 = require('q');
var requireDirectory  = require('require-directory');
var yml               = require('js-yaml');
var nodeJSX           = require('node-jsx');

nodeJSX.install({ extension: '.jsx' });

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
    isCached: !Nuts.isDevelopment,
    engines: {
      jsx: {
        path: "app/assets/javascript/views",
        compileMode: "async",
        module: {
          compile: function(template, options, next) {
            return next(null, function(context, options, callback) {
              var page = require("../public/assets/server");
              var stats = require('./stats.generated.json');
              page(context.entryPoint || stats.assetsByChunkName.main, context).then(function(renderedView) {
                callback(null, renderedView);
              });
            });
          }
        }
      }
    }
  });
}

var commonConfiguration = function() {
  var deferred = Q.defer();

  try {
    initializeSettings();
    initializeServer();
    setupDatabase()
    loadModels();
    loadEnvironment();
    loadInitializers();
    loadActions();
    deferred.resolve();
  } catch(e) {
    console.log(e);
    deferred.reject(e);
  }
  return deferred.promise;
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
      console.log(err);
      process.exit(1);
    }).done();
  },
  deez: function() {
    commonConfiguration().then(function(){
      try {
        loadRoutes();
        startServer();
      } catch(e) {
        console.log(e);
        throw e;
      }
    }).fail(function(err) {
      process.exit(1);
    });
  }
}
