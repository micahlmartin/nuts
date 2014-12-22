module.exports = function(params) {
  var deferred = Nuts.defer();

  new Nuts.models.User(params).save(function(err, savedUser) {
    if(err) return deferred.reject(err);

    var jobs = Nuts.require('lib/jobs/queue').connect();
    jobs
      .create('send_email_confirmation', {
        email: savedUser.email,
        title: savedUser.email
      })
      .priority('high')
      .attempts(5)
      .save(function(err) {
        if(err) Nuts.reportError(err);

        deferred.resolve(savedUser);
      });
  });

  return deferred.promise;
};
