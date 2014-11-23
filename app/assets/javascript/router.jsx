/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router-component')
var Pages = Router.Locations;
var Location= Router.Location;

var Home = require('./components/home/index.jsx');
var Login = require('./components/account/login.jsx');

var Router = React.createClass({

  render: function() {
    return (
      <Pages path={this.props.path}>
        <Location path="/" handler={Home} />
        <Location path="/login" handler={Login} />
      </Pages>
    );
  }

});

module.exports = Router;
