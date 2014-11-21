var React = require("react");

var Application = React.createClass({
  render: function() {
    require("../stylesheets/application.scss");

    return (
      <div className="application">
        <h1>Hello World</h1>
        <pre>{this.props.url}</pre>
        <img src={require("../images/node-logo.png")} height="100" />
      </div>
    );
  }
});

module.exports = Application;
