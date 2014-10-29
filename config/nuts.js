var _                 = require('lodash');
var Hapi              = require('hapi');
var requireDirectory  = require('require-directory');
var settings          = require('./settings');

// Initialize the global container
GLOBAL.Nuts = {}

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

var loadInitializers = function() {
  requireDirectory(module, './initializers');
  Nuts.server.log('info', 'Initializers loaded successfully');
}

var loadRoutes = function() {
  Nuts.server.route(require('./routes'));
  Nuts.server.log('info', 'Routes loaded successfully');
}

var loadEnvironment = function() {
  var env = process.env.NODE_ENV || "development";
  require('./environments/' + env);
}

var startServer = function() {
  Nuts.server.start(function () { });
}


module.exports = {
  deez: function() {
    initializeServer();
    loadPlugins();
    loadEnvironment();
    loadInitializers();
    loadRoutes();
    startServer();
  }
}
