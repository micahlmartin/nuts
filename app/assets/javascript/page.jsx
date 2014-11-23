var React = require('react');
var styleCollector = require("../../../lib/webpack/style-collector");
var Application = require('./application.jsx');
var utilities = require('../../../lib/utilities');
var Router = require('./router.jsx');

module.exports = function(filename, assetFilename, context) {
  console.log(filename);
  var html;
  var css = styleCollector.collect(function() {
    html = React.renderToString(<Router path={context.path} />);
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
        <div id="content" dangerouslySetInnerHTML={{__html: html}} />
        <script src={"assets/" + assetFilename} />
      </body>
    </html>
  );
}
