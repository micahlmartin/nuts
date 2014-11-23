/**
 * @jsx React.DOM
 */

var React = require('react');

var Navbar = React.createClass({

  render: function() {

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
            <a href="/" className="navbar-brand">
              <span className="ion-cube"></span> App Name
            </a>
          </div>
          <div className="collapse navbar-collapse">
             <ul className="nav navbar-nav">
                <li className="active">
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
             </ul>
             <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="/login">Login</a>
                </li>
                <li>
                  <a href="/signup">Create Account</a>
                </li>
             </ul>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Navbar;
