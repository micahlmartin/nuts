/**
 * @jsx React.DOM
 */

var React = require('react');
var GA    = require('../../mixins/ga.jsx');

var Index = React.createClass({

  componentDidMount: function() {
    GA.pageView();
  },

  render: function() {
    return (
      <div>
        <h1>HOME</h1>
      </div>
    );
  }

});

module.exports = Index;
