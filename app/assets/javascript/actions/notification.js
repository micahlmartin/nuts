var AppDispatcher = require('../dispatcher/app-dispatcher');
var NotificationConstants = require('../constants/notification');

var SessionActions = {
    flash: function(type, message) {
      AppDispatcher.trigger(NotificationConstants.FLASH, {
        type: type,
        message: message
      });
    },

    clearFlash: function() {
      AppDispatcher.trigger(NotificationConstants.CLEAR_FLASH);
    }
};

module.exports = SessionActions;
