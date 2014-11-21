/** @jsx React.DOM */

window.React = require('react');
var Application = require('./application.jsx');

React.render(
  <Application />,
  document.getElementById("content")
);

var serverSideStyle = document.getElementById("server-side-style");
if(serverSideStyle) {
  document.head.removeChild(serverSideStyle);
}

var ga = require('react-google-analytics');
var GAInitializer = ga.Initializer;
React.render(<GAInitializer />, document.getElementById("analytics"));
