"use strict";

var Backbone = require('backbone');

var Signup = Backbone.Model.extend({
  validation: {
    email: {
      required: true,
      pattern: "email"
    },
    password: {
      required: true
    },
    passwordConfirmation: {
      equalTo: 'password'
    },
    terms: {
      acceptance: true
    }
  }
});

module.exports = Signup;
