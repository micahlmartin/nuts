/**
 * @jsx React.DOM
 */

var React = require('react');
var Link  = require('react-router').Link;

var Navbar = React.createClass({

  _onChange: function() {
    var newState = require('../../stores/session').attributes;
    this.setState(newState);
  },

  getInitialState: function() {
    return {
      isAuthenticated: this.props.session.isAuthenticated || false
    };
  },

  componentDidMount: function() {
    require('../../stores/session').on('change', this._onChange);
  },

  render: function() {
    var loggedOutNav = <div />;
    if(!this.state.isAuthenticated) {
      loggedOutNav = (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Create Account</Link>
          </li>
        </ul>
      );
    }


    return (
      <div className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" data-toggle="collapse" data-target=".navbar-collapse" className="navbar-toggle">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand">
              <span className="ion-cube"></span> App Name
            </Link>
          </div>
          {loggedOutNav}
        </div>
      </div>
    );
  }

});

module.exports = Navbar;
