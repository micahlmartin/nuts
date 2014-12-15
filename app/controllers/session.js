"use strict";

var Boom              = require('boom');
var Rack              = require('hat').rack();
var SignupVM          = require('../assets/javascript/view_models/signup');
var SessionVM         = require('../assets/javascript/view_models/session');
var AuthenticateUser  = Nuts.actions.authenticateUser;
var RegisterUser      = Nuts.actions.registerUser;


module.exports = {

  login: {
    handler: function(request, reply) {

      if(request.method == 'get') {

        if(request.auth.isAuthenticated) {
          return reply.redirect('/');
        }

        return reply.view("account/login.jsx", {title: "Login"});
      }

      AuthenticateUser(request.payload.email, request.payload.password).then(function(user) {
        request.auth.session.set(user);
        return reply({isAuthenticated: true, credentials: user});
      }).fail(function(err) {
        reply(Boom.unauthorized());
      }).done();
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
      if(request.method == 'get') {

        if(request.auth.isAuthenticated) {
          return reply.redirect('/');
        }

        return reply.view('account/signup.jsx');
      }

      var signupVM = new SignupVM(request.payload);
      signupVM.bind('validated', function(isValid, model, errors) {
        if(!isValid) {
          return reply({errors: errors});
        } else {
          RegisterUser(model.attributes).then(function(user) {
            request.auth.session.set(user);
            return reply({isAuthenticated: true, credentials: user});
          }).fail(function(err) {
            var errorMessage = "Something went wrong.";
            var validationErrors = {};
            if(err.name && err.name == "MongoError") {
              switch (err.code) {
              case 11000:
                errorMessage = "An account with that email already exists.";
                validationErrors.email = errorMessage;
                break;
              }
            }
            return reply({error: errorMessage, validationErrors: validationErrors});
          }).done();
        }
      });
      signupVM.validate();
    }
  },

  index: {
    handler: function(request, reply) {
      reply(request.auth);
    }
  }
};
