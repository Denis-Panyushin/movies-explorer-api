const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  getMe, updateUser,
} = require('../controllers/users');

router.get('/users/me', getMe);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }).unknown(true),
}), updateUser);

module.exports = router;
