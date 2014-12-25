module.exports = function(email) {
  var mail                    = Nuts.require('lib/mail');
  var PasswordResetToken      = Nuts.models.PasswordResetToken;
  var util                    = require('util');
  var Q                       = require('Q');

  var context = {
    reset_password_link: util.format(
      "http%s://%s/reset?id=%s",
      Nuts.settings.useSSL ? 's' : '',
      Nuts.settings.domain,
      PasswordResetToken.generate(email))
  };

  var options = {
    recipients: [{
      email: email,
      type: "to"
    }]
  };

  var deferred = Q.defer();

  mail.sendTemplate('reset_password', context, options).then(function(result) {
    deferred.resolve(result);
  }).fail(function(err) {
    deferred.reject(err);
  })

  return deferred.promise;
};
