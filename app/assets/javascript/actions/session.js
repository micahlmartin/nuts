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
    },

    forgotPassword: function(email) {
      AppDispatcher.trigger(SessionConstants.FORGOT_PASSWORD, {
        email: email
      });
    },

    resetPassword: function(password, passwordConfirmation, id) {
      AppDispatcher.trigger(SessionConstants.RESET_PASSWORD, {
        password: password,
        passwordConfirmation: passwordConfirmation,
        id: id
      })
    }
};

module.exports = SessionActions;
