const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { default: isEmail } = require('validator/lib/isEmail');
const NoAuthorization = require('../errors/NoAuthorization');
const { VALIDATE_DATA_LOGIN_MESSAGE, VALIDATE_EMAIL_MESSAGE } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isEmail,
      message: VALIDATE_EMAIL_MESSAGE,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new NoAuthorization(VALIDATE_DATA_LOGIN_MESSAGE));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new NoAuthorization(VALIDATE_DATA_LOGIN_MESSAGE));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
