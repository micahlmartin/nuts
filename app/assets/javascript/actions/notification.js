var AppDispatcher = require('../dispatcher/app-dispatcher');

var SessionActions = {
    flash: function(type, message) {
      AppDispatcher.trigger('flash', {
        type: type,
        message: message
      });
    }
};

module.exports = SessionActions;
