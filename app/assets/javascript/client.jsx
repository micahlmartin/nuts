/** @jsx React.DOM */

window.React      = require('react');
window.jQuery = window.$ = require('jquery');

var Main          = require('../../views/layouts/main.jsx');
var ga            = require('react-google-analytics');
var GAInitializer = ga.Initializer;

Main.renderClient(function(Handler) {

  React.render(
    <Handler {...window.bootstrapData} />,
    document.getElementById("content")
  );

  var serverSideStyle = document.getElementById("server-side-style");
  if(serverSideStyle) {
    document.head.removeChild(serverSideStyle);
  }

});

window.session = require('./stores/session');
