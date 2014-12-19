"use strict";

var _             = require('lodash');
var Backbone      = require('backbone');
var AppDispatcher = require('../dispatcher/app-dispatcher');
var global        = require('../global.js');

var Notification = Backbone.Model.extend({

  initialize: function() {
    _.bindAll(this);
  },

  flash: function(type, message) {
    this.set({flash: {type: type, message: message}}, {silent: true});
    this.trigger('flash');
  }

});

var SessionStore = new Notification();

AppDispatcher.on('all', function(eventName, payload) {
  switch (eventName) {
  case 'flash':
    return SessionStore.flash(type, message);
  default:

  }

});

module.exports = SessionStore;
