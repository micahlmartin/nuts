var requireDirectory  = require('require-directory');
var controllers       = requireDirectory(module, '../app/controllers');

module.exports = [
  {
    method: "GET",
    path: "/assets/{path*}",
    handler: {
      directory: { path: './public'}
    }
  },
  {
    method: "GET",
    path: "/",
    config: controllers.home.index
  },
  {
    method: "GET",
    path: "/secure",
    config: controllers.home.secure
  },
  {
    method: "GET",
    path: "/users",
    config: controllers.users.index
  }
]
