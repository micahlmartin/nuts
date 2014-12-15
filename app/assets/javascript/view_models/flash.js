var Backbone  = require('backbone');
var _         = require('lodash');
var uuid      = require('node-uuid');


var Flash = Backbone.Model.extend({

  toJSON: function() {
    var attrs = this.attributes;
    return {
      success: _.map(attrs.success, function(message) { return {id: uuid.v1(), message: message}}),
      error: _.map(attrs.error, function(message) { return {id: uuid.v1(), message: message}}),
      info: _.map(attrs.info, function(message) { return {id: uuid.v1(), message: message}}),
      warning: _.map(attrs.warning, function(message) { return {id: uuid.v1(), message: message}}),
    };
  }

});

module.exports = Flash;
