/**
 * @jsx React.DOM
 */

var React = require('react');

var message = React.createClass({

  render: function() {
    return (
      <h1>{this.props.message}</h1>
    );
  },

});

module.exports = message;
