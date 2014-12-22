/**
* @jsx React.DOM
*/

var React = require('react');
var Link  = require('react-router').Link;
var GA    = require('../../mixins/ga.jsx');

var PasswordReset = React.createClass({

  mixins: [GA],

  componentDidMount: function() {
    this.pageView();
  },

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
