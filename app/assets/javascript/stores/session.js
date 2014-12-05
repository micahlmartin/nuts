"use strict";

var _             = require('lodash');
var Backbone      = require('backbone');
var AppDispatcher = require('../dispatcher/app-dispatcher');
var $             = require('jquery');
var global        = require('../global.js');

var _session = Backbone.Model.extend({

  defaults: {
    isAuthenticated: false,
    credentials: null
  },

  initialize: function() {
    _.bindAll(this);
  },

  url: function() { return '/session' },

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

  login: function(username, password) {
    var self = this;
    this.postAuth('/login', {username: username, password: password}).then(function(session) {
      self.set(session);
    }).fail(function(xhr, message, err) {
      // We want to forec the change event to always fire
      self.set({'error': 'Email address and password combination are incorrect'}, {silent: true});
      self.trigger('change');
    });
  }

});

var SessionStore = new _session();

AppDispatcher.on('all', function(eventName, payload) {
  switch (eventName) {
  case 'login':
    SessionStore.login(payload.username, payload.password);
    break;
  case 'logout':

  default:

  }

});

module.exports = SessionStore;
