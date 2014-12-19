var crypto = require('crypto');
var assert = require('assert');


module.exports = {
  encryptString: function(algorithm, plainText, password) {
    var cipher = crypto.createCipher(algorithm, password);
    return cipher.update(plainText, 'utf8', 'hex') + cipher.final('hex');
  },
  decryptString: function(algorithm, encryptedText, password) {
    var decipher = crypto.createDecipher(algorithm, password);
    return decipher.update(encryptedText, 'hex', 'utf8') + decipher.final('utf8');
  }
}
