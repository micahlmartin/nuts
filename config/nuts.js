var _                 = require('lodash');
var fs                = require('fs');
var Hapi              = require('hapi');
var path              = require('path');
var requireDirectory  = require('require-directory');
var yml               = require('js-yaml');


var initializeSettings = function() {
  // Initialize the global container
  GLOBAL.Nuts = {
    environment: (process.env.NODE_ENV || 'development'),
    root: path.normalize(__dirname + '/../'),
  };

  // Load settings.yml and parse it as a lodash template
  renderedSettingsTemplate = _.template(fs.readFileSync(path.join(Nuts.root, 'config/settings.yml')), {})

  // Parse the settings as a yml file
  settingsYml = yml.safeLoad(renderedSettingsTemplate);

  // Only get the settings for the current environment
  Nuts.settings = settingsYml[Nuts.environment];
}

var commonConfiguration = function() {
  initializeSettings();
  initializeServer();
  loadModels();
  loadPlugins();
  loadEnvironment();
  loadInitializers();
  loadActions();
}

var loadSettings = function() {
  _.template()
}

var initializeServer = function() {
  Nuts.server = new Hapi.Server('0.0.0.0', Nuts.settings.port, Nuts.settings.hapi)
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
  Nuts.server.start(function () { });
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
