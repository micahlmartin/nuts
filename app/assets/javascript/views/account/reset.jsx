/**
* @jsx React.DOM
*/

var React = require('react');
var Link  = require('react-router').Link;

var PasswordReset = React.createClass({

  render: function() {

    return (
      <div>
        <div className="page-header">
          <h3>Password Reset</h3>
        </div>
      </div>
    );
  }

});

module.exports = PasswordReset;
