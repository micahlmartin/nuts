
module.exports = function(params) {
  var deferred = Nuts.defer();

  deferred.resolve(true);

  return deferred.promise;
};
