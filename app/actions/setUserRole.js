var Q = require('Q');


module.exports = function(role, email) {

  if(!(role in Nuts.models.Roles)) {
    return Q.fcall(function() {
      throw new Error(Nuts.models.ErrorMessages.INVALID_ROLE);
    });
  }

  var deferred = Q.defer();

  Nuts.actions.findUserByEmail(email).then(function(user) {
    if(!user) {
      return deferred.reject(new Error(Nuts.models.ErrorMessages.USER_NOT_FOUND));
    }

    user.role = role;
    user.save(function(err, savedUser) {
      if(err) Nuts.reportError(err, true);

      deferred.resolve(savedUser);
    })
  }).fail(function(err) {
    Nuts.reportError(err, true);
  });

  return deferred.promise;
};
