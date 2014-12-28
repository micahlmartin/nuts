"use strict";

require('../test-helper');
var test                    = require('unit.js');
var Q                       = require('q');
var ConfirmEmail            = Nuts.actions.confirmEmail;
var EmailConfirmationToken  = Nuts.models.EmailConfirmationToken;
var User                    = Nuts.models.User;
var mail                    = Nuts.require('lib/mail');

describe('SendEmailConfirmaton', function() {

  beforeEach(function() {
    this.originalSendTemplate = mail.sendTemplate;
    mail.sendTemplate = test.stub();
  });

  afterEach(function() {
    mail.sendTemplate = this.originalSendTemplate;
  });

  it("should succeed", function(done) {
    var email = "micahlmartin@gmail.com";

    mail.sendTemplate.returns(Q.fcall(function (){ return true}));

    Nuts.actions.sendEmailConfirmation(email).then(function(result) {
      test.assert(mail.sendTemplate.withArgs('confirm_email', test.sinon.match({}), test.sinon.match(function(value) {
        return value.recipients[0].email == email;
      })).calledOnce);
      done();
    }).fail(function(err) {
      console.log(err);
      test.fail();
    }).done()
  });

});
