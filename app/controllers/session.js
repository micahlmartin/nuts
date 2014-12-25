"use strict";

var Boom              = require('boom');
var Rack              = require('hat').rack();
var SignupVM          = require('../assets/javascript/view_models/signup');
var SessionVM         = require('../assets/javascript/view_models/session');
var PasswordResetVM   = require('../assets/javascript/view_models/password-reset');
var AuthenticateUser  = Nuts.actions.authenticateUser;
var RegisterUser      = Nuts.actions.registerUser;
var ResetPassword     = Nuts.actions.resetPassword;

module.exports = {

  login: {
    handler: function(request, reply) {
      if(request.auth.isAuthenticated) {
        return reply.redirect('/');
      }

      if(request.method == 'get') {
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
      if(request.auth.isAuthenticated) {
        return reply.redirect('/');
      }

      if(request.method == 'get') {
        return reply.view('account/signup.jsx');
      }

      var signupVM = new SignupVM(request.payload);
      signupVM.bind('validated', function(isValid, model, errors) {
        if(!isValid) {
          return reply({validationErrors: errors});
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
  },

  forgot: {
    handler: function(request, reply) {

      if(request.auth.isAuthenticated) {
        return reply.redirect('/');
      }

      if(request.method == 'get') {
        return reply.view('account/forgot.jsx');
      }

      var jobs = Nuts.require('lib/jobs/queue').connect();
      jobs
        .create('send_password_reset', {
          email: request.payload.email,
          title: request.payload.email
        })
        .priority('high')
        .attempts(5)
        .save(function(err) {
          if(err) Nuts.reportError(err);

          reply({success: true})
        });
    }
  },

  reset: {
    handler: function(request, reply) {

      var result = Nuts.models.PasswordResetToken.parse(request.query.id || request.payload.id);
      if(!result.isValid) {
        request.session.flash('error', 'That token has already been used or is expired.');
        return reply.redirect('/');
      }

      if(request.method == 'get') {
        return reply.view('account/reset.jsx', {id: request.query.id});
      }

      var passwordResetModel = new PasswordResetVM(request.payload);
      passwordResetModel.bind('validated', function(isValid, model, errors) {
        if(!isValid) {
          return reply({validationErrors: errors});
        } else {
          ResetPassword(result.email, passwordResetModel.get('password')).then(function() {
            return reply({success: true});
          }).fail(function(err) {
            var errorMessage = "Something went wrong.";
            return reply({error: errorMessage, validationErrors: {}});
          }).done();
        }
      });
      passwordResetModel.validate();
    }
  }
};
