/**
 * @jsx React.DOM
 */

var React = require('react');
var Message = require('./message.jsx');

var helloWorld = React.createClass({

  render: function() {
    return (
      <div>
        <Message message="Hello World" />
      </div>
    );
  },

});

module.exports = helloWorld;
