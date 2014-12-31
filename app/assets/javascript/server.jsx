var React           = require('react');
var styleCollector  = require("../../../lib/webpack/style-collector");
var utilities       = Nuts.require('lib/utilities');
var Main            = require('./views/shared/main.jsx');
var defer           = require('q').defer;
var util            = require('util');
var _               = require('lodash');
var fs              = require('fs');
var path            = require('path');

var layoutCache = [];
var layoutsDir = path.join(Nuts.root, 'app', 'assets', 'javascript', 'views', 'layouts');

var renderTemplate = function(template, context) {
  return _.template(template, context)
}

module.exports = function(assetFilename, context) {
  var deferred = defer();

  // Use the layout passed into the view context if it exists or the default one
  var layoutName = context.layout || Nuts.settings.layout;

  Main.renderServer(context.path, function(Handler) {
    var html;
    var css = styleCollector.collect(function() {
      html = React.renderToString(<Handler {...context} />);
    });

    viewContext = _.assign(context, {
      css: css,
      html: html,
      assetFilename: assetFilename,
      data: utilities.safeStringify(context)
    });

    var layout = layoutCache[layoutName];
    if(!layout) {
      fs.readFile(path.join(layoutsDir, layoutName + '.template'), function(err, data) {
        if(err) {
          Nuts.reportError(err, true);
        }

        layout = data.toString();
        layoutCache[layoutName] = layout;

        deferred.resolve(_.template(layout, viewContext));
      });
    } else {
      deferred.resolve(_.template(layout, viewContext));
    }

  });

  return deferred.promise;
}
