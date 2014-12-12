var AppDispatcher = require('../dispatcher/app-dispatcher');

var SessionActions = {
    login: function(email, password) {
      AppDispatcher.trigger('login', {email: email, password: password});
    },

    lgout: function() {
      AppDispatcher.trigger('logout');
    },

    signup: function(email, password, passwordConfirmation, terms) {
      AppDispatcher.trigger('signup', {
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation,
        terms: terms
      });
    }
};

module.exports = SessionActions;
