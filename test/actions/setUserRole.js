"use strict";

require('../test-helper');
var test                    = require('unit.js');
var Q                       = require('q');
var SetUserRole             = Nuts.actions.setUserRole;
var ErrorMessages           = Nuts.models.ErrorMessages;
var Roles                   = Nuts.models.Roles;


describe("setUserRole", function() {

  it("throws error when role is invalid", function(done) {
    SetUserRole("test", "test@email.com").fail(function(err) {
      test.assert(err.message == ErrorMessages.INVALID_ROLE);
      done();
    }).then(function() {
      test.fail("Expected error " + ErrorMessages.INVALID_ROLE);
    });
  });

  it("throw error when user is not found", function(done) {
    SetUserRole(Roles.ADMIN, "test@email.com").fail(function(err) {
      test.assert(err.message == ErrorMessages.USER_NOT_FOUND);
      done();
    }).then(function(err) {
      test.fail("Expected error " + ErrorMessages.USER_NOT_FOUND);
      done();
    });
  });

});
