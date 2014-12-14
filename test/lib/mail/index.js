"use strict";

require('../../test-helper');
var test  = require('unit.js');
var Q     = require('q');
var mail  = require('../../../lib/mail');

describe("mail", function() {

  describe("getTemplate", function() {
    it("should return template info", function(done) {
      mail.getTemplate("confirm_email").then(function(templateInfo) {
        test.assert('html' in templateInfo);
        test.assert('text' in templateInfo);
        test.assert('subject' in templateInfo);
        done();
      }).done();
    });
  });

  describe("getRenderedTemplate", function() {
    it("should return rendered template", function(done) {
      mail.getRenderedTemplate("confirm_email", {validate_email_url: "test123"}).then(function(templateInfo) {
        test.string(templateInfo.html).contains('test123');
        done();
      }).fail(function(err) {
        test.assert.fail(err);
      }).done();
    });
  });

  describe("sendTemplate", function() {
    it("should send template", function(done) {
      var context = {
        validate_email_url: "test123"
      };

      var options = {
        recipients: [{
          "email": "micahlmartin@gmail.com",
          "name": "Micah Martin",
          "type": "to"
        }]
      };

      mail.sendTemplate("confirm_email", context, options).then(function(result) {
        test.assert(result[0].status == 'sent');
        done();
      }).fail(function(err) {
        test.assert.fail(err);
      }).done();
    });
  });

});
