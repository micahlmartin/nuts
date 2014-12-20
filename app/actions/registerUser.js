var User = Nuts.models.User;

module.exports = function(params) {
  var deferred = Nuts.defer();

  new User(params).save(function(err, savedUser) {
    if(err) return deferred.reject(err);

    Nuts.actions.sendEmailConfirmation(savedUser.email).then(function(result) {
      deferred.resolve(savedUser);
    }).fail(function(err) {
      Nuts.reportError(err);
      deferred.resolve(savedUser);
    });
  });

  return deferred.promise;
};
