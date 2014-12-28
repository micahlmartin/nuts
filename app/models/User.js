var mongoose  = require('mongoose');
var timestamps = require('mongoose-timestamp');
var bcrypt    = require('bcrypt-nodejs');


var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  emailConfirmed: Boolean,
  password: String,

  facebook: String,
  twitter: String,
  google: String,
  github: String,
  instagram: String,
  linkedin: String,
  tokens: Array,

  profile: {
    name: { type: String, default: '' },
    gender: { type: String, default: '' },
    location: { type: String, default: '' },
    website: { type: String, default: '' },
    picture: { type: String, default: '' }
  },

  resetPasswordToken: String,
  resetPasswordExpires: Date,
  role: {type: String, enum: require('./Roles')._keys}
});

userSchema.plugin(timestamps);

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// Hash the password
userSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(5, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.set('toJSON', {
  transform: function(doc, ret, options) {

    var retJson = {
      email: ret.email,
      profile: ret.profile
    };

    return retJson;
  }
});

module.exports = mongoose.model('User', userSchema);
