/** @jsx React.DOM */

window.React      = require('react');
window.jQuery = window.$ = require('jquery');

// Global Backbone Config
var Backbone      = require('backbone');
var validation    = require('backbone.validation');
var _             = require('lodash');
_.extend(Backbone.Model.prototype, validation.mixin);

var ga            = require('react-google-analytics');
var GAInitializer = ga.Initializer;

var contentLayoutName = window.bootstrapData.page || "main.jsx";
var Content = require('./views/layouts/content/' + contentLayoutName);

Content.renderClient(function(Handler) {

  React.render(
    <Handler {...window.bootstrapData} />,
    document.getElementById("react-target")
  );

  var serverSideStyle = document.getElementById("server-side-style");
  if(serverSideStyle) {
    document.head.removeChild(serverSideStyle);
  }

});

window.session = require('./stores/session');
