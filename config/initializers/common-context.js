"use strict";

var Hoek              = require('hoek');
var _                 = require('lodash');
var SessionVM         = require('../../app/assets/javascript/view_models/session');
var FlashVM         = require('../../app/assets/javascript/view_models/flash');
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
    settings: settings,
    session: new SessionVM(request.auth).toJSON(),
    helpers: requireDirectory(module, '../../app/helpers'),
    flash: new FlashVM(request.session.flash()).toJSON()
  };
};


Nuts.server.ext('onPreResponse', function (request, reply) {
  if (request.response.variety === 'view') {
    request.response.source.context = Hoek.applyToDefaults(getDefaultContext(request), request.response.source.context || {});
    request.response.source.context.path = request.path;
  }

  reply.continue();
});
