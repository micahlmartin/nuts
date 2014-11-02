var requireDirectory  = require('require-directory');
var controllers       = requireDirectory(module, '../app/controllers');

module.exports = [
  {
    method: "GET",
    path: "/assets/images/{path*}",
    config: controllers.assets.images
  },
  {
    method: "GET",
    path: "/assets/stylesheets/{path*}",
    config: controllers.assets.stylesheets
  },
  {
    method: "GET",
    path: "/assets/javascript/{path*}",
    config: controllers.assets.javascript
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
