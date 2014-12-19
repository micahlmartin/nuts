"use strict";

var _             = require('lodash');
var Backbone      = require('backbone');
var AppDispatcher = require('../dispatcher/app-dispatcher');
var $             = require('jquery');
var global        = require('../global.js');
var SignupVM   = require('../view_models/signup.js');

var _session = Backbone.Model.extend({

  defaults: {
    isAuthenticated: false,
    credentials: null
  },

  initialize: function() {
    _.bindAll(this);
  },

  url: function() { return '/session'; },

  /*
  * Abstracted fxn to make a POST request to the auth endpoint
  * This takes care of the CSRF header for security
  */
  postAuth: function(url, data){
    var self = this;
    data.csrf = global.csrf;
    return $.ajax({
      url: url,
      contentType: 'application/json',
      dataType: 'json',
      type: 'POST',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', global.csrf);
      },
      data:  JSON.stringify(data)
    });
  },

  login: function(email, password) {
    var self = this;
    this.postAuth('/login', {email: email, password: password}).then(function(session) {
      self.clear().set(session);
    }).fail(function(xhr, message, err) {
      // We want to forec the change event to always fire
      self.clear().set({'error': 'Email address and password combination are incorrect'});
    });
  },

  signup: function(email, password, passwordConfirmation, terms) {

    var self = this;

    var signupModel = new SignupVM({
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
      terms: terms
    });

    signupModel.bind('validated', function(isValid, model, errors) {
      if(!isValid) {
        self.clear().set('validationErrors', errors);
      } else {
        self.postAuth('/signup', {
          email: email,
          password: password,
          passwordConfirmation: passwordConfirmation,
          terms: terms
        }).then(function(session) {
          self.clear().set(session);
        }).fail(function(xhr, message, err) {
          self.clear().set('error', message);
        });
      }
    });
    signupModel.validate();
  }

});

var SessionStore = new _session();

AppDispatcher.on('all', function(eventName, payload) {
  switch (eventName) {
  case 'login':
    return SessionStore.login(payload.email, payload.password);
  case 'logout':
    return SessionStore.logout();
  case 'signup':
    return SessionStore.signup(
      payload.email,
      payload.password,
      payload.passwordConfirmation,
      payload.terms
    );
  case 'flash':
    return SessionStore.flash(type, message);
  default:

  }

});

module.exports = SessionStore;
