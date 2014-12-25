/**
* @jsx React.DOM
*/

var React = require('react');

var ValidationMessage = {

  getInputStyle: function(field) {
    if(!this.state.validationErrors) {
      return null;
    }

    if(this.state.validationErrors[field]) {
      return "error";
    }

    return null;
  },

  getValidationMessage: function(field) {
    if(!this.state.validationErrors) {
      return null;
    }

    if(this.state.validationErrors[field]) {
      return this.state.validationErrors[field];
    }

    return null;
  }
}

module.exports = ValidationMessage;