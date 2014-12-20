var requireDirectory  = require('require-directory');
var controllers       = requireDirectory(module, '../app/controllers');

module.exports = [

  // Assets
  {
    method: "GET",
    path: "/assets/{path*}",
    config: {
      cache: {
        privacy: 'public',
        expiresIn: 31536000000 // 1 year in milliseconds
      }
    },
    handler: {
      directory: { path: './public/assets'}
    }
  },

  // Home
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

  // Users
  {
    method: "GET",
    path: "/users",
    config: controllers.users.index
  },

  // Session
  {
    method: ["GET", "POST"],
    path: "/login",
    config: controllers.session.login
  },
  {
    method: ["GET", "POST"],
    path: "/logout",
    config: controllers.session.logout
  },
  {
    method: ["GET", "POST"],
    path: "/signup",
    config: controllers.session.signup
  },
  {
    method: ["GET", "POST"],
    path: "/session",
    config: controllers.session.index
  },
  {
    method: ["GET", "POST"],
    path: "/password-reset",
    config: controllers.session.passwordReset
  },

  //Emails
  {
    method: "GET",
    path: "/email/confirmation",
    config: controllers.email.confirmation
  }
]
