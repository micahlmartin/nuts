"use strict";

var Authenticate = require('../../lib/authentication').authenticate;
var Boom = require('boom');
var Rack = require('hat').rack();


module.exports = {
  login: {
    handler: function(request, reply) {
      var title = "Login";

      if (request.method === 'post') {
        request.auth.session.set({email: "micahlmartin@gmail.com"});
        inspect(request.auth);
        // request.auth.session.set(new Nuts.models.user({email: "micahlmartin@gmail.com"}));
        reply("done");
      //   Authenticate(request.payload.email, request.payload.password).then(function(user) {
      //
      //   }).fail(function(err) {
      //     reply.view("account/login.jsx", {path: request.path, error: "Username or password is incorrect.", title: title});
      //   }).done();
      // } else { // GET
      //   return reply.view("account/login.jsx", {path: request.path, title: title});
      } else {
        return reply.view("account/login.jsx", {path: request.path, title: title});
      }
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
};
