/** @jsx React.DOM */

window.React = require('react');

var Main = require('../../views/layouts/main.jsx');

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
