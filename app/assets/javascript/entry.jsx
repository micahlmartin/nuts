/** @jsx React.DOM */

window.React = require('react');

var Router = require('./router.jsx');

React.render(
  <Router path={window.location.pathname} />,
  document.getElementById("content")
);

var serverSideStyle = document.getElementById("server-side-style");
if(serverSideStyle) {
  document.head.removeChild(serverSideStyle);
}
