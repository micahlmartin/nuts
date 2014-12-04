var React = require('react');
var styleCollector = require("../../../lib/webpack/style-collector");
var utilities = require('../../../lib/utilities');
var Main = require('../../views/layouts/main.jsx');
var defer = require('q').defer;
var util = require('util');


module.exports = function(assetFilename, context) {
  deferred = defer();

  Main.renderServer(context.path, function(Handler) {
    var html;
    var css = styleCollector.collect(function() {
      html = React.renderToString(<Handler {...context} />);
    });
    
    deferred.resolve(React.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <title dangerouslySetInnerHTML={{__html: context.title}} />
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="csrf" content={context.csrf} />
          <style id="server-side-style" dangerouslySetInnerHTML={{__html: css}} />
        </head>
        <body>
          <script id="bootstrap-data" dangerouslySetInnerHTML={{__html: "window.bootstrapData = " + utilities.safeStringify(context) + ";"}} />
          <div id="content" dangerouslySetInnerHTML={{__html: html}} />
          <script src={"assets/" + assetFilename} />
        </body>
      </html>
    ));

  });

  return deferred.promise;
}
