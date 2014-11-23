/** @jsx React.DOM */

window.React = require('react');

var Main = require('./main.jsx');

Main().then(function(Handler) {
  React.render(
    <Handler path={window.location.pathname} />,
    document.getElementById("content")
  );

  var serverSideStyle = document.getElementById("server-side-style");
  if(serverSideStyle) {
    document.head.removeChild(serverSideStyle);
  }
});
