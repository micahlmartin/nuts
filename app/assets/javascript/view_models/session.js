var Backbone  = require('backbone');
var _         = require('lodash');

var Session = Backbone.Model.extend({

  whitelist: [
    'isAuthenticated',
    'credentials'
  ],

  defaults: {
    isAuthenticated: false
  },

  toJSON: function() {
    return _.pick(this.attributes, this.whitelist);
  }

});

module.exports = Session;
