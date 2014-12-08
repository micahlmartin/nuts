var AppDispatcher = require('../dispatcher/app-dispatcher');

var SessionActions = {
    login: function(username, password) {
      AppDispatcher.trigger('login', {username: username, password: password});
    },

    lgout: function() {
      AppDispatcher.trigger('logout');
    },

    signup: function(username, password, passwordConfirmation, terms) {
      AppDispatcher.trigger('signup', {
        username: username,
        password: password,
        passwordConfirmation: passwordConfirmation,
        terms: terms
      });
    }
};

module.exports = SessionActions;
