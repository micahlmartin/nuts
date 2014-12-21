var React           = require('react');
var styleCollector  = require("../../../lib/webpack/style-collector");
var utilities       = Nuts.require('lib/utilities');
var Main            = require('./views/shared/main.jsx');
var defer           = require('q').defer;
var util            = require('util');
var _               = require('lodash');
var fs              = require('fs');
var path            = require('path');

var template = null;
var templateFilePath = path.join(Nuts.root, 'app', 'assets', 'javascript', 'views', 'layouts', Nuts.settings.layout + '.template');

var renderTemplate = function(template, context) {
  return _.template(template, context)
}

module.exports = function(assetFilename, context) {
  var deferred = defer();

  Main.renderServer(context.path, function(Handler) {
    var html;
    var css = styleCollector.collect(function() {
      html = React.renderToString(<Handler {...context} />);
    });

    context = _.assign(context, {
      css: css,
      html: html,
      assetFilename: assetFilename,
      data: utilities.safeStringify(context)
    });

    if(!template) {
      fs.readFile(templateFilePath, function(err, data) {
        if(err) {
          Nuts.reportError(err, true);
        }

        template = data.toString();

        deferred.resolve(_.template(template, context));
      });
    } else {
      deferred.resolve(_.template(template, context));
    }

  });

  return deferred.promise;
}
