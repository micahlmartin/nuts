var crypto = require('crypto');
var assert = require('assert');

var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL


module.exports = {
  encryptString: function(algorithm, plainText, password) {
    var cipher = crypto.createCipher(algorithm, password);
    return cipher.update(plainText, 'utf8', 'hex') + cipher.final('hex');
  },
  decryptString: function(algorith, encryptedText, password) {
    var decipher = crypto.createDecipher(algorithm, password);
    return decipher.update(encryptedText, 'hex', 'utf8') + decipher.final('utf8');
  }
}
