# movies-explorer-api
Бэкенд для дипломного проекта

## Функционал серверного приложения
Данное серверное приложение созданное на express имеет регистрацию и авторизацию, создание фильма и его удаление, получение всех фильмов созданных пользователем, а так же редактирование профиля.

__Маршуты регистрации и авторизации__
Маршрут метод:POST `/signup` - регистрация пользователя.
Маршрут метод:POST `/signin` - вход для уже зарегистрированного пользователя.
Маршрут метод:POST `/signout` - выход пользователя.

__Маршруты получения информации о поьзователе и ее редактирование__
Маршрут метод:GET `/users/me` - получние информации о пользователе.
Маршрут метод:POST `/users/me` - редактирование информации о пользователе.

__Маршруты для получения карточекб доавбления и удаления их__
Маршрут метод:GET `/movies` - получение всех фильмов созданых пользователем.
Маршрут метод:POST `/movies` - создает карточку с переданными данными.
Маршрут метод:DELTE `/movies/:movieId` - удаляет карточку.

__Обратится к апи можно по адрсу:[https://api.moviesdiplompanu.nomorepartiesxyz.ru](https://api.moviesdiplompanu.nomorepartiesxyz.ru)__
