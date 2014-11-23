var React = require("react");
var Navbar = require('./components/shared/navbar.jsx');
var Footer = require('./components/shared/footer.jsx');

var Application = React.createClass({
  render: function() {
    require("../stylesheets/application.scss");

    return (
      <div>
        <Navbar />
        <Footer />
      </div>
    );
  }
});

module.exports = Application;
