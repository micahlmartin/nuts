"use strict";

var Hoek = require('hoek');
var _    = require('lodash');

var blacklistedConfigs = [
  'database',
  'session',
  'port'
];

var getDefaultContext = function() {
  var settings = Hoek.clone(Nuts.settings);
  _(blacklistedConfigs).forEach(function(key) {
    delete settings[key];
  });

  return {settings: settings};
};


Nuts.server.ext('onPreResponse', function (request, reply) {
    if (request.response.variety === 'view') {
        request.response.source.context = Hoek.applyToDefaults(getDefaultContext(), request.response.source.context);
    }

    reply();
});
