require('dotenv').config();
const jwt = require('jsonwebtoken');
const NoAuthorization = require('../errors/NoAuthorization');
const { NO_AUTHORIZATION_MESSAGE } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new NoAuthorization(NO_AUTHORIZATION_MESSAGE));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-key');
  } catch (err) {
    return next(new NoAuthorization(NO_AUTHORIZATION_MESSAGE));
  }

  req.user = payload;
  return next();
};
