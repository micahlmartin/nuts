var mongoose    = require('mongoose');
var dbSettings  = Nuts.settings.database;
var util        = require('util');

var dbUrl = process.env.MONGODB || process.env.MONGOHQ_URL || util.format('mongodb://%s:%s/%s', dbSettings.host, dbSettings.port, dbSettings.database);

mongoose.connect(dbUrl);
mongoose.connection.on('error', function() {
  Nuts.log('error', 'Failed to connect to MongoDB.');
})

module.exports = {
  connect: function() {
    return mongoose;
  }
}
