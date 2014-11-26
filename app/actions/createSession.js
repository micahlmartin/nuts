var Session = Nuts.models.session;

module.exports = function(userId) {
  var deferred = Nuts.defer();

  new Session({
    userId: userId
  }).save(function(err, savedSession) {
    if(err) {
      deferred.reject(err);
    } else {
      deferred.resolve(savedSession);
    }
  })

  return deferred.promise;
}
