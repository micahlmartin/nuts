var _                 = require('lodash');
var Hapi              = require('hapi');
var requireDirectory  = require('require-directory');
var settings          = require('./settings');

// Initialize the global container
GLOBAL.Nuts = {}
Nuts.settings = settings;

var initializeServer = function() {
  Nuts.server = new Hapi.Server('0.0.0.0', settings.port, settings.hapi)
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
  Nuts.environment = Nuts.settings.environment;
  require('./environments/' + Nuts.environment);
}

var loadActions = function() {
  Nuts.actions = requireDirectory(module, '../app/actions');
  Nuts.server.log('info', "Actions loaded successfully");
}

var startServer = function() {
  Nuts.server.start(function () { });
}

var commonConfiguration = function() {
  initializeServer();
  loadModels();
  loadPlugins();
  loadEnvironment();
  loadInitializers();
  loadActions();
}

module.exports = {
  console: function() {
    commonConfiguration();
    var repl  = require('repl');
    var util  = require('util');
    var eyes  = require('eyes');
    var moment = require('moment');

    // open the repl session
    var replServer = repl.start({
      prompt: util.format("%s (%s) > ", Nuts.settings.app_name, Nuts.environment)
    });

    replServer.context.moment = moment;

  },
  deez: function() {
    commonConfiguration();
    loadRoutes();
    startServer();
  }
}
