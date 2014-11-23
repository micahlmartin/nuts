/**
 * @jsx React.DOM
 */

var React         = require('react');
var Router        = require('react-router');
var Route         = Router.Route;
var DefaultRoute  = Router.DefaultRoute;
var RouteHandler  = Router.RouteHandler;
var Link          = Router.Link;

// Compo
var Home          = require('../../views/home/index.jsx');
var Login         = require('../../views/account/login.jsx');
var Navbar        = require('../../views/shared/navbar.jsx')
var Footer        = require('../../views/shared/footer.jsx')
var defer         = require('q').defer;

// This is the main layout for the app
var App = React.createClass({

  render: function() {
    require("../stylesheets/application.scss");

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
    <Route name="login" handler={Login} />
    <DefaultRoute handler={App} />
  </Route>
);

module.exports = function(path, callback) {
  var deferred = defer();

  Router.run(routes, path, function(Handler) {
    deferred.resolve(Handler);
  });

  return deferred.promise;
}
