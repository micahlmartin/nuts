/**
 * @jsx React.DOM
 */

var React = require('react');
var Link          = require('react-router').Link;

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
            <Link to="/" className="navbar-brand">
              <span className="ion-cube"></span> App Name
            </Link>
          </div>
          <div className="collapse navbar-collapse">
             <ul className="nav navbar-nav">
                <li className="active">
                  <Link to="home">Home</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
             </ul>
             <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link to="login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Create Account</Link>
                </li>
             </ul>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Navbar;
