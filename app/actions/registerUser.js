var User = Nuts.models.User;

module.exports = function(params) {
  var deferred = Nuts.defer();

  new User(params).save(function(err, savedUser) {
    if(err) return deferred.reject(err);



    return deferred.resolve(savedUser);
  });

  return deferred.promise;
};
