var server = Nuts.server;

// var uuid = 1;       // Use seq instead of proper unique identifiers for demo only

// var users = {
//     john: {
//         id: 'john',
//         password: 'password',
//         name: 'John Doe'
//     }
// };

// var login = function (request, reply) {

//     if (request.auth.isAuthenticated) {
//         return reply.redirect('/');
//     }

//     var message = '';
//     var account = null;

//     if (request.method === 'post') {

//         if (!request.payload.email ||
//             !request.payload.password) {

//             message = 'Missing email or password';
//         }
//         else {
//           Nuts.actions.findUserById(request.email).then(function(user) {
//             if(!user) {
//               message = 'Invalid email or password'
//             } else {
//               user.comparePassword(request.payload.password, function(err, isMatch) {
//                 if
//               })
//             }
//           });
//             account = users[request.payload.email];
//             if (!account ||
//                 account.password !== request.payload.password) {

//                 message = 'Invalid email or password';
//             }
//         }
//     }

//     if (request.method === 'get' ||
//         message) {

//         return reply('<html><head><title>Login page</title></head><body>'
//             + (message ? '<h3>' + message + '</h3><br/>' : '')
//             + '<form method="post" action="/login">'
//             + 'email: <input type="text" name="email"><br>'
//             + 'Password: <input type="password" name="password"><br/>'
//             + '<input type="submit" value="Login"></form></body></html>');
//     }

//     Nuts.actions.createSession(account.id).then(function(session) {
//       var sid = session._id;
//       request.server.app.cache.set(sid, { account: account }, 0, function (err) {
//         if (err) throw err;

//         request.auth.session.set({ sid: sid });
//         return reply.redirect('/');
//       });
//     });
// };

server.pack.register(require('hapi-auth-cookie'), function (err) {

    var cache = server.cache('sessions', { expiresIn: 3 * 24 * 60 * 60 * 1000 });
    server.app.cache = cache;

    server.auth.strategy('session', 'cookie', true, {
        password: Nuts.settings.session.secret,
        cookie: Nuts.settings.session.cookie_name,
        redirectTo: Nuts.settings.session.redirect_to,
        isSecure: !Nuts.isDevelopment,
        validateFunc: function (session, callback) {

            cache.get(session.sid, function (err, cached) {

                if (err) {
                    return callback(err, false);
                }

                if (!cached) {
                    return callback(null, false);
                }

                return callback(null, true, cached.account)
            })
        }
    });
});
