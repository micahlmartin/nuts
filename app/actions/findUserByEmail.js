var User = Nuts.models.User;

module.exports = function(email) {
  var deferred = Nuts.defer();

  User.where({email: email}).findOne(function(err, user) {
    if(err) {
      deferred.reject(user);
    } else {
      deferred.resolve(user);
    }
  });

  return deferred.promise;
}
