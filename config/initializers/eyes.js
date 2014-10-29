// Override the default inspect method
var inspect = require('eyes').inspector({maxLength: false});
GLOBAL.inspect = inspect;
