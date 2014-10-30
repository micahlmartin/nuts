var User = Nuts.models.User;

users = [new User({
  id: 1,
  name: {
    first: "Joe",
    last: "Schmoe",
    full: "Joe Schmoe"
  },
  email: "joe@schmoe.com"
}),
new User({
  id: 2,
  name: {
    first: "Sally",
    last: "Mae",
    full: "Sally Mae"
  },
  email: "sally@mae.com"
})]

module.exports = {
  execute: function() {
    var deferred = Nuts.defer();

    process.nextTick(function() {
      deferred.resolve(users);
    })

    return deferred.promise;
  }
}