"use strict";

var Backbone = require('backbone');

var PasswordReset = Backbone.Model.extend({
  validation: {
    password: {
      required: true
    },
    passwordConfirmation: {
      equalTo: 'password'
    }
  }
});

module.exports = PasswordReset;
