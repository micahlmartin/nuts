process.env.NODE_ENV = 'test'


require('../lib/nuts').deez();

if(Nuts.environment !== 'test') {
  throw new Error("Tests can only be run with in the test environment.");
}

// Setup the database
before(function() {
  var deferred = Nuts.defer();

  Nuts.mongoose.connection.on('open', function() {
    this.db.dropDatabase();
    deferred.resolve();
  })

  return deferred.promise;
})
