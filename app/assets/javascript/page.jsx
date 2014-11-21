var React = require('react');
var styleCollector = require("../../../lib/webpack/style-collector");
var Navbar = require('./components/shared/navbar.jsx');
var Footer = require('./components/shared/footer.jsx');
var ga = require('react-google-analytics');
var utilities = require('../../../lib/utilities');


module.exports = function(filename, assetFilename, context) {
  var html;
  var css = styleCollector.collect(function() {
    var Component = require("./" + filename);
    html = React.renderToString(<Component {...context} />);
  });

  return React.renderToString(
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <title></title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style id="server-side-style" dangerouslySetInnerHTML={{__html: css}} />
      </head>
      <body>
        <script id="bootstrap-data" dangerouslySetInnerHTML={{__html: "window.bootstrapData = " + utilities.safeStringify(context) + ";"}} />
        <Navbar />
        <div id="content" dangerouslySetInnerHTML={{__html: html}} />
        <Footer />
        <div id="analytics" />
        <script src={"assets/" + assetFilename} />
      </body>
    </html>
  );
}
