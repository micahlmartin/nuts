/**
 * @jsx React.DOM
 */

var React = require('react');

var Footer = React.createClass({

  render: function() {
    return (
      <footer>
        <div className="container text-center">
          <p className="pull-left">© 2014 App Name, Inc. All Rights Reserved</p>
          <ul className="pull-right list-inline">
            <li>
              <a href="https://github.com/micahlmartin/nuts">GitHub Project</a>
            </li>
            <li>
              <a href="https://github.com/micahlmartin/nuts/issues">Issues</a>
            </li>
          </ul>
        </div>
      </footer>
    );
  }

});

module.exports = Footer;
