var User = Nuts.models.User;

module.exports = function(id) {
  var deferred = Nuts.defer();

  User.find(id).success(function(user) {
    deferred.resolve(user);
  }).error(function(err) {
    deferred.reject(err);
  })

  return deferred.promise;
}
