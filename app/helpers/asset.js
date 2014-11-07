var fs        = require('fs');
var path      = require('path');

var BASE_PATH = "/assets";
var _manifest;


function combinePaths(resourcePath) {
  return path.join(BASE_PATH, resourcePath);
}

function loadManifest() {
  return JSON.parse(fs.readFileSync('public/assets/rev-manifest.json'));
}

function fetchManifest() {
  if(Nuts.isDevelopment) {
    return loadManifest();
  } else {
    return (_manifest || (_manifest = loadManifest()));
  }
}


module.exports = function(resourcePath) {
  var manifest = fetchManifest();

  if(resourcePath in manifest) {
    return combinePaths(manifest[resourcePath]);
  }

  return combinePaths(resourcePath);
}
