var User = Nuts.models.user;

module.exports = function() {
  var deferred = Nuts.defer();

  User.find({}).sort('-createdAt').exec().then(function(userList) {
    deferred.resolve(userList);
  }, function(err) {
    deferred.reject(err);
  })

  return deferred.promise;
}
