module.exports = function(email) {
  var mail                    = Nuts.require('lib/mail');
  var EmailConfirmationToken  = Nuts.models.EmailConfirmationToken;
  var util                    = require('util');


  var context = {
    validate_email_url: util.format(
      "http%s://%s/email/confirmation?id=%s",
      Nuts.settings.useSSL ? 's' : '',
      Nuts.settings.domain,
      EmailConfirmationToken.generate(email))
  };

  var options = {
    recipients: [{
      email: email,
      type: "to"
    }]
  };

  return mail.sendTemplate('confirm_email', context, options);
};
