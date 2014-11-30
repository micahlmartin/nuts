// var HttpSignature = require('http-signature');
//
// var users = [
//     {
//         id: 1,
//         username: 'john',
//         apikeyid: '18KF2FGK6807ZQA945R2',
//         secretkey: '46573e78ce9df4f2d9ae93afd5f5c281'
//     }
// ];
//
// var validate = function (request, parsedSignature, callback) {
//     var keyId = parsedSignature.keyId;
//     var credentials = {};
//     var secretKey;
//     request.log('info', "VALIDATING!!!")
//     users.forEach(function(user, index) {
//         if (user.apikeyid === keyId) {
//             secretKey = user.secretkey;
//             credentials = {id: user.id, username: user.username};
//         }
//     })
//
//     if (!secretKey) {
//         return callback(null, false);
//     }
//
//     if(HttpSignature.verifySignature(parsedSignature, secretKey)) {
//         callback(null, true, credentials);
//     } else {
//         callback(null, false);
//     };
// };
//
// Nuts.server.auth.strategy('hmac', 'signature', { validateFunc: validate });
