module.exports = function(username, password) {
  var deferred = Nuts.defer();

  Nuts.actions.findUserByEmail(username).then(function(user) {
    if(!user) {
      deferred.reject(Nuts.models.ErrorMessages.INVALID_EMAIL_OR_PASSWORD);
    } else {
      user.comparePassword(password, function(err, isMatch) {
        if(err || !isMatch) {
          deferred.reject(Nuts.models.ErrorMessages.INVALID_EMAIL_OR_PASSWORD);
        } else {
          deferred.resolve(user);
        }
      });
    }
  }).fail(function(err) {
    throw err;
  });

  return deferred.promise;
}
