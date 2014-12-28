"use strict";

require('../test-helper');
var test = require('unit.js');
var Q = require('q');

describe('authenticateUser', function() {
  var authenticate = Nuts.actions.authenticateUser;
  var messages = Nuts.models.ErrorMessages;
  var email = "test@email.com";
  var password = "password";

  beforeEach(function() {
    this.originalFindUserByEmail = Nuts.actions.findUserByEmail;
  });

  afterEach(function() {
    Nuts.actions.findUserByEmail = this.originalFindUserByEmail;
  });

  it("should fail when user is not found", function(done) {
    var findUserByEmailStub = test.stub();
    findUserByEmailStub.withArgs(email).returns(Q.resolve(null));

    Nuts.actions.findUserByEmail = findUserByEmailStub;

    authenticate(email, password).fail(function(err) {
      test.assert.equal(err, messages.INVALID_EMAIL_OR_PASSWORD);
      done();
    }).done();

  });

  it("should fail when password is wrong", function(done) {
    var user = new Nuts.models.User();
    user.comparePassword = function(password, cb) { cb(null, false); };

    var findUserByEmailStub = test.stub();
    findUserByEmailStub.withArgs(email).returns(Q.resolve(user));

    Nuts.actions.findUserByEmail = findUserByEmailStub;

    authenticate(email, password).fail(function(err) {
      test.assert.equal(err, messages.INVALID_EMAIL_OR_PASSWORD);
      done()
    }).done();
  });

  it("should return user when authentication succeeds", function(done) {
    var user = new Nuts.models.User();
    user.comparePassword = function(password, cb) { cb(null, true); };

    var findUserByEmailStub = test.stub();
    findUserByEmailStub.withArgs(email).returns(Q.resolve(user));

    Nuts.actions.findUserByEmail = findUserByEmailStub;

    authenticate(email, password).then(function(authenticatedUser) {
      test.assert.equal(user, authenticatedUser);
      done()
    }).done();
  });

});
