var AppDispatcher = require('../dispatcher/app-dispatcher');
var SessionConstants = require('../constants/session');


var SessionActions = {
    login: function(email, password) {
      AppDispatcher.trigger(SessionConstants.LOGIN, {email: email, password: password});
    },

    logout: function() {
      AppDispatcher.trigger(SessionConstants.LOGOUT);
    },

    signup: function(email, password, passwordConfirmation, terms) {
      AppDispatcher.trigger(SessionConstants.SIGNUP, {
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation,
        terms: terms
      });
    }
};

module.exports = SessionActions;
