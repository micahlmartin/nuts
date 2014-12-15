"use strict";

require('../test-helper');
var test    = require('unit.js');
var Q       = require('q');
var crypto  = require('../../lib/crypto');


describe("crypto", function() {
  it("should encrypt string properly", function() {
    var password = "test123";
    var text = "I love dogs";

    var encryptedString = crypto.encryptString("aes256", text, password);
    test.assert(encryptedString != text);
  });

  it("should encrypt string properly", function() {
    var password = "test123";
    var text = "I love dogs";

    var encryptedString = crypto.encryptString("aes256", text, password);
    var decryptedString = crypto.decryptString("aes256", encryptedString, password);

    test.assert(text === decryptedString);
  });
});
