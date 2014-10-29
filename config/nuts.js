var _                 = require('lodash');
var requireDirectory  = require('require-directory');
var server            = require('../server');


var loadPlugins = function() {
  plugins = []
  _.forOwn(requireDirectory(module, './plugins'), function(value, key) {
    plugins.push(value);
  })

  server.pack.register(plugins, function(err) {
    if(err) {
      server.log('error', err)
    } else {
      server.log('info', 'Plugins registered successfully.');
    }
  });
}

var loadInitializers = function() {
  requireDirectory(module, './initializers');
}

var loadRoutes = function() {
  server.route(require('./routes'));
}


module.exports = {
  deez: function() {
    loadPlugins();
    loadInitializers();
    loadRoutes();
  }
}
