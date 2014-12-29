var path = require('path');

var defaultLoader = function(paths) {
  paths.forEach(function(path) {
    require(path);
  })
};

module.exports = function() {
  var initializersDirectory = path.join(this.root, 'config', 'initializers');

  var paths = [];

  require("fs").readdirSync(initializersDirectory).forEach(function(file) {
    paths.push(path.join(initializersDirectory, file));
  });

  (this.options.initializerLoader || defaultLoader)(paths);
};
