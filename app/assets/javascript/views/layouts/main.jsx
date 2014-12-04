/**
 * @jsx React.DOM
 */

var React         = require('react');
var Router        = require('react-router');
var Route         = Router.Route;
var DefaultRoute  = Router.DefaultRoute;
var RouteHandler  = Router.RouteHandler;
// var Link          = Router.Link;

// Compo
var Home          = require('../home/index.jsx');
var Login         = require('../account/login.jsx');
var Navbar        = require('../shared/navbar.jsx')
var Footer        = require('../shared/footer.jsx')
var defer         = require('q').defer;

// This is the main layout for the app
var App = React.createClass({

  render: function() {
    require("../../../stylesheets/application.scss");
    return (
      <div>
        <Navbar />
        <RouteHandler />
        <Footer />
      </div>
    );
  }

});

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute name="home" handler={Home} />
    <Route name="login" handler={Login} />
  </Route>
);


module.exports.renderClient = function(callback) {
  Router.run(routes, Router.HistoryLocation, callback);
}

module.exports.renderServer = function(path, callback) {
  Router.run(routes, path, callback);
}
