"use strict";

var Authenticate = require('../../lib/authentication').authenticate;
var Boom = require('boom');
var Rack = require('hat').rack();


module.exports = {
  login: {
    handler: function(request, reply) {
      var title = "Login";

      if (request.method === 'post') {
        request.auth.user.set({email: "micahlmartin@gmail.com"});
        reply("done");
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
};
