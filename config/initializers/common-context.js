"use strict";

var Hoek              = require('hoek');
var _                 = require('lodash');
var SessionVM         = require('../../app/assets/javascript/view_models/session');
var requireDirectory  = require('require-directory');

var blacklistedConfigs = [
  'database',
  'session',
  'port'
];

var getDefaultContext = function(request) {
  var settings = Hoek.clone(Nuts.settings);
  _(blacklistedConfigs).forEach(function(key) {
    delete settings[key];
  });

  return {
    title: '',
    settings: settings,
    session: new SessionVM(request.auth).toJSON(),
    flash: request.session.flash(),
    // utilities: Nuts.require('lib/utilities')
  };
};

Nuts.server.ext('onPreResponse', function (request, reply) {
  if (request.response.variety === 'view') {
    request.response.source.context = Hoek.applyToDefaults(getDefaultContext(request), request.response.source.context || {});
    request.response.source.context.path = request.path;
  }

  reply.continue();
});
