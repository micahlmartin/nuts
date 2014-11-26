"use strict";

require('./test-helper');
var test = require('unit.js');
var Q = require('q');

describe('Authentication', function() {
  var authentication = require('../lib/authentication');
  var authenticate = authentication.authenticate;
  var messages = authentication.messages;
  var email = "test@email.com";
  var password = "password";

  it("should fail when user is not found", function(done) {
    var findUserByIdStub = test.stub();
    findUserByIdStub.withArgs(email).returns(Q.resolve(null));

    Nuts.actions.findUserById = findUserByIdStub;

    authenticate(email, password).fail(function(err) {
      test.assert.equal(err, messages.INVALID_EMAIL_OR_PASSWORD);
      done();
    }).done();

  });

  it("should fail when password is wrong", function(done) {
    var user = new Nuts.models.user();
    user.comparePassword = function(password, cb) { cb(null, false); };

    var findUserByIdStub = test.stub();
    findUserByIdStub.withArgs(email).returns(Q.resolve(user));

    Nuts.actions.findUserById = findUserByIdStub;

    authenticate(email, password).fail(function(err) {
      test.assert.equal(err, messages.INVALID_EMAIL_OR_PASSWORD);
      done()
    }).done();
  });

  it("should return user when authentication succeeds", function(done) {
    var user = new Nuts.models.user();
    user.comparePassword = function(password, cb) { cb(null, true); };

    var findUserByIdStub = test.stub();
    findUserByIdStub.withArgs(email).returns(Q.resolve(user));

    Nuts.actions.findUserById = findUserByIdStub;

    authenticate(email, password).then(function(authenticatedUser) {
      test.assert.equal(user, authenticatedUser);
      done()
    }).done();
  });

});
