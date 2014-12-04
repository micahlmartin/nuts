var AppDispatcher = require('../dispatcher/app-dispatcher');

var SessionActions = {
    login: function(username, password) {
      AppDispatcher.trigger('login', {username: username, password: password});
    },

    lgout: function() {
      AppDispatcher.trigger('logout');
    }
};

module.exports = SessionActions;
