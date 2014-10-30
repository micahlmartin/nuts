var User = Nuts.models.User;

module.exports = function() {
  var deferred = Nuts.defer();

  User.findAll().success(function(users) {
    deferred.resolve(users);
  }).error(function(err) {
    deferred.reject(err);
  })

  return deferred.promise;
}
