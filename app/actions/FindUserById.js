var User = Nuts.models.user;

module.exports = function(id) {
  var deferred = Nuts.defer();

  User.find(id, function(err, user) {
    if(err) return deferred.reject(err);

    return deferred.resolve(user);
  });

  return deferred.promise;
}
