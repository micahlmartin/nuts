// Load modules

var Boom = require('boom');
var Hoek = require('hoek');


// Declare internals

var internals = {};


exports.register = function (plugin, options, next) {
  plugin.dependency('yar');
  plugin.auth.scheme('cookie', internals.implementation);
  next();
};


exports.register.attributes = {
  name: "auth-cookie",
  version: "0.0.1"
};

//
internals.implementation = function (server, options) {

  Hoek.assert(options, 'Missing cookie auth strategy options');

  var settings = Hoek.clone(options);                        // Options can be reused

  if (typeof settings.appendNext === 'boolean') {
    settings.appendNext = (settings.appendNext ? 'next' : '');
  }

  server.ext('onPreAuth', function (request, reply) {

    request.auth.session = {
      set: function (credentials) {
        request.auth.artifacts = credentials;
        request.session.set('__auth', credentials);
      },
      clear: function () {
        request.session.clear('__auth');
        request.auth.artifacts = null;
      }
    };

    return reply();
  });

  unauthenticated = function (err, request, reply, result) {

    if (settings.redirectOnTry === false && request.auth.mode === 'try') {
      return reply(err, result);
    }

    var redirectTo = settings.redirectTo;
    if (request.route.plugins['auth-cookie'] && request.route.plugins['auth-cookie'].redirectTo !== undefined) {
      redirectTo = request.route.plugins['auth-cookie'].redirectTo;
    }

    if (!redirectTo) {
      return reply(err, result);
    }

    var uri = redirectTo;
    if (settings.appendNext) {
      if (uri.indexOf('?') !== -1) {
        uri += '&';
      }
      else {
        uri += '?';
      }

      uri += settings.appendNext + '=' + encodeURIComponent(request.url.path);
    }

    return reply('You are being redirected...', result).redirect(uri);
  };

  var scheme = {
    authenticate: function (request, reply) {
      var credentials = request.session.get('__auth');

      if(!credentials) {
        return unauthenticated(Boom.unauthorized(), request, reply, { credentials: credentials, artifacts: credentials });
      }

      return reply(null, {credentials: credentials, artifacats: credentials});
    }
  };

  return scheme;
};