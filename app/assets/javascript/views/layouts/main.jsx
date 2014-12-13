/**
 * @jsx React.DOM
 */

// Other libraries
var React         = require('react');
var Router        = require('react-router');
var Route         = Router.Route;
var DefaultRoute  = Router.DefaultRoute;
var RouteHandler  = Router.RouteHandler;
var defer         = require('q').defer;

// Page Components
var Home          = require('../home/index.jsx');
var Login         = require('../account/login.jsx');
var Reset         = require('../account/reset.jsx');
var Signup        = require('../account/signup.jsx');
var Header        = require('../shared/header.jsx');
var Footer        = require('../shared/footer.jsx');


// This is the main layout for the app
var App = React.createClass({

  render: function() {
    require("../../../stylesheets/application.scss");
    return (
      <div>
        <Header {...this.props} />
        <div className="container">
          <RouteHandler {...this.props} />
        </div>
        <Footer {...this.props} />
      </div>
    );
  }

});

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute name="home" handler={Home} />
    <Route name="login" handler={Login} />
    <Route name="signup" handler={Signup} />
    <Route name="password-reset" handler={Reset} />
  </Route>
);


module.exports.renderClient = function(callback) {
  Router.run(routes, Router.HistoryLocation, callback);
}

module.exports.renderServer = function(path, callback) {
  Router.run(routes, path, callback);
}
