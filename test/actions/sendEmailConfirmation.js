"use strict";

require('../test-helper');
var test                    = require('unit.js');
var Q                       = require('q');
var ConfirmEmail            = Nuts.actions.confirmEmail;
var EmailConfirmationToken  = Nuts.models.EmailConfirmationToken;
var User                    = Nuts.models.User;

describe('SendEmailConfirmaton', function() {

  it("should succeed", function(done) {
    var email = "micahlmartin@gmail.com";
    Nuts.actions.sendEmailConfirmation(email).then(function(result) {
      test.assert(result[0].email == email);
      done();
    }).fail(function(err) {
      test.fail();
    }).done()
  });

});
