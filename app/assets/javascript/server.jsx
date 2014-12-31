/*

This file is used for server-side rendering.
The Hapi view configuration for jsx files are run through this.

*/

var React           = require('react');
var styleCollector  = require("../../../lib/webpack/style-collector");
var utilities       = Nuts.require('lib/utilities');
var defer           = require('q').defer;
var util            = require('util');
var _               = require('lodash');
var fs              = require('fs');
var path            = require('path');

var pageLayoutsDir = path.join(Nuts.root, 'app', 'assets', 'javascript', 'views', 'layouts', 'pages');

// Used to cache page layouts
var pageLayouts = {};


// param: assetFilename - This is the name of the webpack file that should be loaded
// param: viewContext - The data to render to the view
module.exports = function(assetFilename, viewContext) {
  var deferred = defer();

  // Get the content layout to render
  var contentLayoutName = viewContext.page || "main.jsx";
  var Content = require('./views/layouts/content/' + contentLayoutName);

  Content.renderServer(viewContext.path, function(Handler) {

    // Render the react view and get the css and html to embed directly in the layout
    var html;
    var css = styleCollector.collect(function() {
      html = React.renderToString(<Handler {...viewContext} />);
    });

    // Data to bind to the layout template
    layoutContext = _.assign(viewContext, {
      css: css,
      html: html,
      assetFilename: assetFilename,
      data: utilities.safeStringify(viewContext)
    });

    // Get the layout to use
    var layoutName = layoutContext.layout || "default.template";

    // See if the layout has already been loaded and cached
    var layout = pageLayouts[layoutName];

    if(!layout) {

      Nuts.log('debug', 'Reading page layout - ' + layoutName);

      fs.readFile(path.join(pageLayoutsDir, layoutName), function(err, data) {
        if(err) {
          Nuts.reportError(err, true);
        }

        layout = data.toString();

        // Cache the layout for faster page loads later
        pageLayouts[layoutName] = data.toString();

        // Render the layout
        deferred.resolve(_.template(layout, layoutContext));
      });
    } else {

      Nuts.log('debug', 'Loaded page layout from the cache - ' + layoutName);

      // The layout is cached already so just render it
      deferred.resolve(_.template(layout, layoutContext));
    }

  });

  return deferred.promise;
}
