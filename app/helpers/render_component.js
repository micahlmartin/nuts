var React = require('react');
var utilities = require('../../lib/utilities');

module.exports = function(componentPath, options) {
  var component = React.createFactory(require('../assets/javascript/components/' + componentPath));
  var componentHtml = React.renderToString(component(options.data.root));
  var normalizedComponentName = componentPath.replace(/(\/|\.|jsx)/gi, '_');

  return '<div id="' + normalizedComponentName + '">' + componentHtml + '</div>' +
         '<script type="text/javascript">' +
            'var ' + normalizedComponentName + ' = React.createFactory(require("' + componentPath + '"));' +
            'React.render(' + normalizedComponentName + '(' + utilities.safeStringify(options) + '), document.getElementById("' + normalizedComponentName + '"))' +
         '</script>'
}
