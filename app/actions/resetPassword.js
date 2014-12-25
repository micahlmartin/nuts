module.exports = function(email, password) {

  var deferred = Nuts.defer();

  Nuts.actions.findUserByEmail(email).then(function(user) {
    user.password = password;
    user.save(function(err, savedUser) {
      if(err) Nuts.reportError(err, true);

      deferred.resolve();
    });
  }).fail(function(err) {
    Nuts.reportError(err, true);
  }).done();

  return deferred.promise;

}