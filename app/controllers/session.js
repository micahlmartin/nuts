"use strict";

var Boom = require('boom');
var Rack = require('hat').rack();
var AuthenticateUser = Nuts.actions.authenticateUser;

module.exports = {
  login: {
    handler: function(request, reply) {
      var title = "Login";
      if (request.method === 'post') {
        AuthenticateUser(request.payload.email, request.payload.password).then(function(user) {
          request.auth.user.set(user);
          reply(user);
        }).fail(function(err) {
          reply(Boom.unauthorized());
        }).done()
      } else {
        return reply.view("account/login.jsx", {path: request.path, title: title});
      }
    }
  },

  logout: {
    handler: function(request, reply) {
      request.auth.user.clear();
      return reply.redirect('/');
    }
  },

  signup: {
    handler: function(request, reply) {
      return reply.view('account/signup.hbs');
    }
  },

  index: {
    handler: function(request, reply) {
      reply(request.auth);
    }
  }
};
