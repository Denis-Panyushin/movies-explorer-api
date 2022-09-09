/* eslint-disable max-classes-per-file */
const NOT_FOUND_ERROR_CODE = 404;
const MONGO_URL = 'mongodb://localhost:27017/moviesdb';
const INCORRECT_DATE_MOVIES_MESSAGE = 'Переданы некорректные данные при создании фильма';
const COPYRIGHT_ERROR_MESSAGE = 'Нельзя удалить чужой фильм';
const VALIDATE_ID_MOVIE_MESSAGE = 'Передан некорректный id фильма';
const NOT_FOUND_MOVIE_MESSAGE = 'Передан несущетвующий id фильма';
const VALIDATE_ID_USER_MESSAGE = 'Передан неккоректный id пользователя';
const INCORRECT_DATE_UPDATE_USERS_MESSAGE = 'Переданы некорктные данные при обновлении профиля';
const NOT_FOUND_USER_MESSAGE = 'Пользователь по указаному id не найден.';
const INCORRECT_DATE_POST_USERS_MESSAGE = 'Переданы некорктные данные при создании профиля';
const CONFLICT_DUPLICATE_EMAIL_MESSAGE = 'Данный email уже зарегестрирован';
const NO_AUTHORIZATION_MESSAGE = 'Необходима авторизация';
const SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка';
const VALIDATE_DATA_LOGIN_MESSAGE = 'Неправильные почта или пароль';
const NOT_FOUND_PAGE_MESSAGE = 'Страницы не существует';
const VALIDATE_LINK_MESSAGE = 'Неправильный формат ссылки';
const VALIDATE_EMAIL_MESSAGE = 'Неправильный формат почты';

module.exports = {
  NOT_FOUND_ERROR_CODE,
  MONGO_URL,
  INCORRECT_DATE_MOVIES_MESSAGE,
  COPYRIGHT_ERROR_MESSAGE,
  VALIDATE_ID_MOVIE_MESSAGE,
  NOT_FOUND_MOVIE_MESSAGE,
  VALIDATE_ID_USER_MESSAGE,
  INCORRECT_DATE_UPDATE_USERS_MESSAGE,
  NOT_FOUND_USER_MESSAGE,
  INCORRECT_DATE_POST_USERS_MESSAGE,
  CONFLICT_DUPLICATE_EMAIL_MESSAGE,
  NO_AUTHORIZATION_MESSAGE,
  SERVER_ERROR_MESSAGE,
  VALIDATE_DATA_LOGIN_MESSAGE,
  NOT_FOUND_PAGE_MESSAGE,
  VALIDATE_LINK_MESSAGE,
  VALIDATE_EMAIL_MESSAGE,
};
