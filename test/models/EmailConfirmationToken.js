"use strict";

require('../test-helper');
var test                    = require('unit.js');
var Q                       = require('q');
var EmailConfirmationToken  = Nuts.models.EmailConfirmationToken;
var moment                  = require('moment')


describe('EmailConfirmationToken', function() {

  it('generate', function(done) {
    var token = EmailConfirmationToken.generate("test@email.com");
    test.assert(token.length > 0);
    done();
  });

  describe('parse', function() {
    it('should succeed when date is valid', function(done) {
      var tokenString = EmailConfirmationToken.generate("test@email.com", moment.utc());
      var token = EmailConfirmationToken.parse(tokenString);
      test.assert(token.isValid);
      test.assert(token.email == 'test@email.com');
      done();
    });

    if("should fail when date is invalid", function(done) {
      var tokenString = EmailConfirmationToken.generate("test@email.com", moment.utc().subtract(0, 'days'));
      var token = EmailConfirmationToken.parse(tokenString);
      test.assert(!token.isValid);
      test.assert(!(email in token));
    });
  });

})
