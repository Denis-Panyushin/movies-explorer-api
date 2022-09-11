require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const {
  NOT_FOUND_ERROR_CODE,
  VALIDATE_ID_USER_MESSAGE,
  INCORRECT_DATE_UPDATE_USERS_MESSAGE,
  NOT_FOUND_USER_MESSAGE,
  INCORRECT_DATE_POST_USERS_MESSAGE,
  CONFLICT_DUPLICATE_EMAIL_MESSAGE,
} = require('../utils/constants');

const { JWT_SECRET = 'dev-key' } = process.env;

module.exports.getMe = (req, res, next) => {
  const { _id } = req.user;

  User.findOne({ _id })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(VALIDATE_ID_USER_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(INCORRECT_DATE_UPDATE_USERS_MESSAGE));
      } else if (err.statusCode === NOT_FOUND_ERROR_CODE) {
        next(new NotFoundError(NOT_FOUND_USER_MESSAGE));
      } else if (err.code === 11000) {
        next(new ConflictError(CONFLICT_DUPLICATE_EMAIL_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.postUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(INCORRECT_DATE_POST_USERS_MESSAGE));
      } else if (err.code === 11000) {
        next(new ConflictError(CONFLICT_DUPLICATE_EMAIL_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('token', token);
      res.status(200).send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.logout = (req, res, next) => {
  const { email } = req.body;

  User.findOne({ email })
    .then((user) => {
      res
        .clearCookie('token')
        .send(user);
    })
    .catch(next);
};
