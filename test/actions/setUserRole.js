"use strict";

require('../test-helper');
var test                    = require('unit.js');
var Q                       = require('q');
var SetUserRole             = Nuts.actions.setUserRole;
var ErrorMessages           = Nuts.models.ErrorMessages;
var Roles                   = Nuts.models.Roles;


describe("setUserRole", function() {

  beforeEach(function() {
    this.originalFindUserByEmail = Nuts.actions.findUserByEmail;
  });

  afterEach(function() {
    Nuts.actions.findUserByEmail = this.originalFindUserByEmail;
  })

  it("throws error when role is invalid", function(done) {
    SetUserRole("test", "test@email.com").fail(function(err) {
      test.assert(err.message == ErrorMessages.INVALID_ROLE);
      done();
    }).then(function() {
      test.fail("Expected error " + ErrorMessages.INVALID_ROLE);
      done();
    });
  });

  it("throw error when user is not found", function(done) {
    var email = "test@email.com";
    Nuts.actions.findUserByEmail = test.stub().withArgs(email).returns(Q.fcall(function() {
      return null;
    }));

    SetUserRole(Roles.ADMIN, "test@email.com").fail(function(err) {
      test.assert(err.message == ErrorMessages.USER_NOT_FOUND);
      done();
    }).then(function(err) {
      test.fail("Expected error " + ErrorMessages.USER_NOT_FOUND);
      done();
    });
  });

  it("returns updated user", function(done) {
    var email = "test@email.com";
    Nuts.actions.findUserByEmail = test.stub().withArgs(email).returns(Q.fcall(function() {
      var user = new Nuts.models.User({email: email});
      user.save = function(callback) { callback(null, user); }
      return user;
    }));

    SetUserRole(Roles.ADMIN, email).then(function(updatedUser) {
      test.assert(updatedUser.role == Roles.ADMIN);
      done();
    }).fail(function(err) {
      console.log(err);
      test.fail("")
    }).done();
  });

});
