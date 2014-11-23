/**
 * @jsx React.DOM
 */

var React = require('react');

var CSRF = React.createClass({

  getInitialState: function() {
    return {
      value: this.props.value || ''
    };
  },

  render: function() {
    return (
      <input type="hidden" name="csrf" value={this.state.value} />
    );
  }

});

module.exports = CSRF;
