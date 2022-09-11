const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { deleteMovie, createMovie, getMovies } = require('../controllers/movies');
const { REGULAR_URL } = require('../utils/constants');

router.get('/movies', getMovies);
router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().required(),
    year: Joi.string().min(4).max(4).required(),
    description: Joi.string().min(2).max(3000).required(),
    image: Joi.string().required().pattern(REGULAR_URL),
    trailerLink: Joi.string().required().pattern(REGULAR_URL),
    thumbnail: Joi.string().required().pattern(REGULAR_URL),
    movieId: Joi.number().min(1).required(),
    nameRU: Joi.string().min(2).max(100).required(),
    nameEN: Joi.string().min(2).max(100).required(),
    owner: { _id: Joi.string().hex().length(24) },
  }).unknown(true),
}), createMovie);
router.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }).unknown(true),
}), deleteMovie);

module.exports = router;
