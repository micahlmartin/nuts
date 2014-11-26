var messages = {
  INVALID_EMAIL_OR_PASSWORD: "INVALID_EMAIL_OR_PASSWORD",
  EMAIL_IS_REQUIRED: "EMAIL_IS_REQUIRED",
  PASSWORD_IS_REQUIRED: "PASSWORD_IS_REQUIRED",
};

module.exports = {

  messages: messages,

  // Returns a new session object and the user record
  authenticate: function(username, password) {
    var deferred = Nuts.defer();

    Nuts.actions.findUserById(username).then(function(user) {
      if(!user) {
        deferred.reject(messages.INVALID_EMAIL_OR_PASSWORD);
      } else {
        user.comparePassword(password, function(err, isMatch) {
          if(err || !isMatch) {
            deferred.reject(messages.INVALID_EMAIL_OR_PASSWORD);
          } else {
            deferred.resolve(user);
          }
        });
      }
    });

    return deferred.promise;
  }
};
