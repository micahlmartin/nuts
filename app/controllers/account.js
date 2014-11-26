"use strict";

var authentication = require('../../lib/authentication');

module.exports = {
  login: {
    handler: function(request, reply) {

      if (request.method === 'post') {
        if (!request.payload.email || !request.payload.password) {

            message = 'Missing email or password';
        }
      }

      return reply.view("account/login.jsx", {path: request.path});
    }
  },

  logout: {
    handler: function(request, reply) {
      request.auth.session.clear();
      return reply.redirect('/');
    }
  },

  signup: {
    handler: function(request, reply) {
      return reply.view('account/signup.hbs');
    }
  },
}
