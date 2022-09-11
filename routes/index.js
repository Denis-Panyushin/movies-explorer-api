const router = require('express').Router();
const auth = require('../middlewares/auth');
const routerAuthorization = require('./authorization');
const routerUsers = require('./users');
const routerMovies = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const { NOT_FOUND_PAGE_MESSAGE } = require('../utils/constants');

router.use('/', routerAuthorization);
router.use('/', auth);
router.use('/', routerUsers);
router.use('/', routerMovies);
router.use('*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_PAGE_MESSAGE));
});

module.exports = router;
