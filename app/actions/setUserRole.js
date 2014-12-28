var Q = require('Q');


module.exports = function(role, email) {
  Q.fcall(function() {
    if(!(role in Nuts.models.Roles.keys)) {
      throw new Error(Nuts.models.ErrorMessages.INVALID_ROLE);
    }
  }).then(function() {
    Nuts.actions.findUserByEmail(email).then(function(user) {
      if(!user) {
        throw new Error(Nuts.models.ErrorMessages.USER_NOT_FOUND);
      }
    }).fail(function(err) {
      throw err;
    }).done();
  });
};
