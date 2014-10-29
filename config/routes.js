var requireDirectory  = require('require-directory');
var controllers       = requireDirectory(module, './controllers');

module.exports = [
  {
    method: "GET",
    path: "/",
    config: controllers.home.index
  },
  {
    method: "GET",
    path: "/secure",
    config: controllers.home.secure
  }
]
