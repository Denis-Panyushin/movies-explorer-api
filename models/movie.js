const mongoose = require('mongoose');
const { default: isURL } = require('validator/lib/isURL');
const { VALIDATE_LINK_MESSAGE } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    default: null,
  },
  director: {
    type: String,
    required: true,
    default: null,
  },
  duration: {
    type: Number,
    required: true,
    default: null,
  },
  year: {
    type: String,
    required: true,
    default: null,
  },
  description: {
    type: String,
    required: true,
    default: null,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: isURL,
      message: VALIDATE_LINK_MESSAGE,
    },
    default: null,
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: isURL,
      message: VALIDATE_LINK_MESSAGE,
    },
    default: null,
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: isURL,
      message: VALIDATE_LINK_MESSAGE,
    },
    default: null,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
    default: null,
  },
  nameRU: {
    type: String,
    required: true,
    default: null,
  },
  nameEN: {
    type: String,
    required: true,
    default: null,
  },
});

module.exports = mongoose.model('movie', movieSchema);
