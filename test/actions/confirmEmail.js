"use strict";

require('../test-helper');
var test                    = require('unit.js');
var Q                       = require('q');
var ConfirmEmail            = Nuts.actions.confirmEmail;
var EmailConfirmationToken  = Nuts.models.EmailConfirmationToken;
var User                    = Nuts.models.User;

describe('confirmEmail', function() {

  beforeEach(function() {
    this.originalFindUserByEmail = Nuts.actions.findUserByEmail;
  });

  afterEach(function() {
    Nuts.actions.findUserByEmail = this.originalFindUserByEmail;
  })

  it("should fail when token cannot be parsed", function(done) {
    ConfirmEmail("bad token").then(function() {
      test.fail();
    }).fail(function(err) {
      done()
    }).done();
  });

  it("should fail when user is not found", function() {
    var email = "test@email.com";
    var token = "test";

    var findUserByEmailStub = test.stub();
    findUserByEmailStub.withArgs(email).returns(Q.resolve(null));
    Nuts.actions.findUserByEmail = findUserByEmailStub;

    var parseStub = test.stub();
    parseStub.withArgs("test").returns({email: email, isValid: true});

    var originalParse = EmailConfirmationToken.parse;
    EmailConfirmationToken.parse = parseStub;

    ConfirmEmail(token).then(function() {
      test.fail();
    }).fail(function(err) {
      EmailConfirmationToken.parse = originalParse;
      done();
    });
  });

  it("should confirm email address", function(done) {
    var email = "test@email.com";
    var token = "test";

    var user  = new User({email: email, emailConfirmed: false});
    user.save = function(callback) {
      callback(null, user);
    }

    var findUserByEmailStub = test.stub();
    findUserByEmailStub.withArgs(email).returns(Q.resolve(user));
    Nuts.actions.findUserByEmail = findUserByEmailStub;

    var parseStub = test.stub();
    parseStub.withArgs("test").returns({email: email, isValid: true});

    var originalParse = EmailConfirmationToken.parse;
    EmailConfirmationToken.parse = parseStub;

    ConfirmEmail(token).then(function() {
      test.assert(user.emailConfirmed == true);
      EmailConfirmationToken.parse = originalParse;
      done();
    }).fail(function(err) {
      console.log(err);
      test.fail();
      done();
    }).done();
  });

});
