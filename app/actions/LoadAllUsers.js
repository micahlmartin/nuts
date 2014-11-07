var User = Nuts.models.user;

module.exports = function() {
  var deferred = Nuts.defer();

  User.all(function(err, users) {
    if(err) return deferred.reject(err);

    return deferred.resolve(users);
  })

  return deferred.promise;
}
