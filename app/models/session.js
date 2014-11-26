var mongoose  = require('mongoose');
var timestamps = require('mongoose-timestamp');

var sessionSchema = new mongoose.Schema({
  userId: String
});

sessionSchema.plugin(timestamps);

module.exports = mongoose.model('Session', sessionSchema);
