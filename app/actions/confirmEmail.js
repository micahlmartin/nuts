"use strict";

module.exports = function(token) {

  var EmailConfirmationToken  = Nuts.models.EmailConfirmationToken;
  var FindUserByEmail         = Nuts.actions.findUserByEmail;
  var Q                       = require('q');

  var data = EmailConfirmationToken.parse(token);

  if(!data.isValid) {
    Q.fcall(function() { throw new Error(); })
  }

  var deferred = Q.defer();

  FindUserByEmail(data.email).then(function(user) {
    user.emailConfirmed = true;
    user.save(function(err, savedUser) {
      if(err) {
        Nuts.reportError(err);
        deferred.reject()
      }
      deferred.resolve();
    })
  }).fail(function(err) {
    Nuts.reportError(err);
    deferred.reject();
  })

  return deferred.promise;
};
