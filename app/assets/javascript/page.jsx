var React = require('react');
var Application = require('./application.jsx');
var styleCollector = require("../../../lib/webpack/style-collector");
var Navbar = require('./components/shared/navbar.jsx');
var Footer = require('./components/shared/footer.jsx');
var ga = require('react-google-analytics');

module.exports = function(filename, assetFilename, context) {
  console.log(filename);
  console.log("HERE!!!!!!!")
  var html;
  var css = styleCollector.collect(function() {
    var Component = require("./" + filename);
    console.log(Component);
    html = React.renderToString(<Component />);
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
        <Navbar />
        <div id="content" dangerouslySetInnerHTML={{__html: html}} />
        <Footer />
        <div id="analytics" />
        <script src={"assets/" + assetFilename} />
      </body>
    </html>
  );
}
