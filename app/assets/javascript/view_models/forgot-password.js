"use strict";

var Backbone = require('backbone');

var ForgotPassword = Backbone.Model.extend({
  validation: {
    email: {
      required: true,
      pattern: 'email'
    }
  }
});

module.exports = ForgotPassword;
