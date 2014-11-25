/** @jsx React.DOM */

window.React      = require('react');
var Main          = require('../../views/layouts/main.jsx');
var ga            = require('react-google-analytics');
var GAInitializer = ga.Initializer;

Main.renderClient(function(Handler) {

  var Wrapper = React.createClass({
    componentDidMount: function() {
      ga('create', this.props.google_analytics, 'auto');
      ga('send', 'pageview');
    },

    render: function() {
      return (
        <div>
          <Handler />
          <GAInitializer />
        </div>
      );
    }
  });

  React.render(
    <Wrapper {...window.bootstrapData} />,
    document.getElementById("content")
  );

  var serverSideStyle = document.getElementById("server-side-style");
  if(serverSideStyle) {
    document.head.removeChild(serverSideStyle);
  }

});
