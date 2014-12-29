"use strict";

var Hoek              = require('hoek');
var _                 = require('lodash');
var SessionVM         = require('../../app/assets/javascript/view_models/session');
var requireDirectory  = require('require-directory');

var getDefaultContext = function(request) {
  return {
    title: '',
    settings: Nuts.safeSettings,
    session: new SessionVM(request.auth).toJSON(),
    flash: request.session.flash(),
  };
};

Nuts.server.ext('onPreResponse', function (request, reply) {
  if (request.response.variety === 'view') {
    request.response.source.context = Hoek.applyToDefaults(getDefaultContext(request), request.response.source.context || {});
    request.response.source.context.path = request.path;
  }

  reply.continue();
});
