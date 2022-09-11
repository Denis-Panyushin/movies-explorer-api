const Movie = require('../models/movie');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const NoCopyrightError = require('../errors/NoCopyrightError');
const {
  NOT_FOUND_ERROR_CODE,
  INCORRECT_DATE_MOVIES_MESSAGE,
  COPYRIGHT_ERROR_MESSAGE,
  NOT_FOUND_MOVIE_MESSAGE,
  VALIDATE_ID_MOVIE_MESSAGE,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.send({ movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(INCORRECT_DATE_MOVIES_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((movie) => {
      const movieOwnerId = String(movie.owner);
      if (movieOwnerId === req.user._id) {
        movie.remove().then(res.send({ movie })).catch(next);
      } else {
        next(new NoCopyrightError(COPYRIGHT_ERROR_MESSAGE));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(VALIDATE_ID_MOVIE_MESSAGE));
      } else if (err.statusCode === NOT_FOUND_ERROR_CODE) {
        next(new NotFoundError(NOT_FOUND_MOVIE_MESSAGE));
      } else {
        next(err);
      }
    });
};
