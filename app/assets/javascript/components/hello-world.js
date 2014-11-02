/**
 * @jsx React.DOM
 */

var react = require('react');

var helloWorld = React.createClass({

  render: function() {
    return (
      <h1>Hello World</h1>
    );
  },

});

module.exports = helloWorld;
