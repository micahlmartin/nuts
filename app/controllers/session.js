  "use strict";

var Boom              = require('boom');
var Rack              = require('hat').rack();
var SignupVM          = require('../assets/javascript/view_models/signup');
var AuthenticateUser  = Nuts.actions.authenticateUser;
var RegisterUser      = Nuts.actions.registerUser;

var uuid = 1;

module.exports = {
  login: {
    // auth: "session",
    handler: function(request, reply) {
      inspect(request.auth);
      if(request.method == 'get') {
        return reply.view("account/login.jsx", {title: "Login"});
      }

      AuthenticateUser(request.payload.email, request.payload.password).then(function(user) {
        request.auth.user.set(user);
        console.log(request.auth.isAuthenticated);
        return reply(request.auth);
      }).fail(function(err) {
        reply(Boom.unauthorized());
      }).done();
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
      inspect(request.auth)
      if(request.method == 'get') {
        return reply.view('account/signup.jsx');
      }

      var signupVM = new SignupVM(request.payload);
      signupVM.bind('validated', function(isValid, model, errors) {
        if(!isValid) {
          return reply({errors: errors});
        } else {
          RegisterUser(model.attributes).then(function(user) {
            request.auth.user.set(user);
            reply(request.auth);
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
