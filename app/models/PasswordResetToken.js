var crypto    = Nuts.require('lib/crypto');
var settings  = Nuts.settings;
var moment    = require('moment');
var util      = require('util')

var INVALID_TOKEN       = {isValid: false};
var EXPIRATION_SECONDS  = 500; // 5 minutes
var DELIMITER           = "#"

module.exports = {

  parse: function(token) {

    var parts = [];

    try
    {
      var buffer = new Buffer(token, 'base64').toString('ascii');
      var decryptedString = crypto.decryptString('aes256', buffer, Nuts.settings.session.secret);
      var parts = decryptedString.split(DELIMITER);
    } catch(e) { }

    if(parts.length != 2) {
      return INVALID_TOKEN;
    }

    var originalDate = moment(parts[1]);
    if(!originalDate.isValid()) {
      return INVALID_TOKEN;
    }

    var now = moment.utc();
    if(((now - originalDate) / 1000) >= EXPIRATION_SECONDS) {
      return INVALID_TOKEN;
    }

    return {
      email: parts[0],
      isValid: true
    }
  },

  generate: function(emailAddress, momentDate) {
    momentDate = momentDate || moment.utc();
    var tokenizedString = util.format("%s%s%s", emailAddress, DELIMITER, momentDate.format());
    var encryptedToken = crypto.encryptString('aes256', tokenizedString, Nuts.settings.session.secret);
    return new Buffer(encryptedToken).toString('base64');
  }
}
