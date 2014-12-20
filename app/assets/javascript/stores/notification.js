"use strict";

var _             = require('lodash');
var Backbone      = require('backbone');
var AppDispatcher = require('../dispatcher/app-dispatcher');
var global        = require('../global.js');
var NotificationConstants = require('../constants/notification');

var Notification = Backbone.Model.extend({

  initialize: function() {
    _.bindAll(this);
  },

  flash: function(type, message) {
    console.log("SETTING FLASH");
    this.set({flash: {type: type, message: message}}, {silent: true});
    this.trigger(NotificationConstants.FLASH);
  },

  clearFlash: function() {
    console.log("CLEARING FLASH");
    this.set({flash: null}, {silent: true});
    this.trigger(NotificationConstants.CLEAR_FLASH);
  }

});

var Notification = new Notification();

AppDispatcher.on('all', function(eventName, payload) {
  switch (eventName) {
  case NotificationConstants.FLASH:
    return Notification.flash(payload.type, payload.message);
  case NotificationConstants.CLEAR_FLASH:
    return Notification.clearFlash();
  default:

  }

});

module.exports = Notification;
