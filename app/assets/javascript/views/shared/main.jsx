/**
 * @jsx React.DOM
 */

// Other libraries
var React               = require('react/addons');
var Router              = require('react-router');
var Route               = Router.Route;
var DefaultRoute        = Router.DefaultRoute;
var RouteHandler        = Router.RouteHandler;
var defer               = require('q').defer;

// Page Components
var Home                = require('../home/index.jsx');
var Login               = require('../account/login.jsx');
var Forgot              = require('../account/forgot.jsx');
var Signup              = require('../account/signup.jsx');
var Reset               = require('../account/reset.jsx');
var Header              = require('./header.jsx');
var Flash               = require('./flash.jsx');
var Footer              = require('./footer.jsx');

// This is the main layout for the app
var App = React.createClass({

  mixins: [Router.State],

  render: function() {
    require("../../../stylesheets/application.scss");

    var name = this.getRoutes().reverse()[0].name;

    return (
      <div id="content">
        <Header {...this.props} />
        <div className="container">
          <Flash {...this.props} />
          <RouteHandler {...this.props} key={name} />
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
    <Route name="forgot" handler={Forgot} />
    <Route name="reset" handler={Reset} />
  </Route>
);


module.exports.renderClient = function(callback) {
  Router.run(routes, Router.HistoryLocation, callback);
}

module.exports.renderServer = function(path, callback) {
  Router.run(routes, path, callback);
}
