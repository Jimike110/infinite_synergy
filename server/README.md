# Сервер

В этой папке находится бэкенд-сервер проекта Infinite Synergy. Он реализован с помощью Node.js и Express, предоставляя RESTful API для управления данными пользователей.

## Структура папки

- **data**: Содержит исходный код серверного приложения.
  - `users.json`: Содержит исходные данные проекта. Большой файл, содержащий миллион пользователей (1 000 000)
- **server.js**: Основная точка входа для серверного приложения.

## Начало работы

1. Установите зависимости: `npm install`.
2. Запустите сервер: `npm start`.
3. Получите доступ к конечным точкам API по адресу `http://localhost:3001/api/users`.

## Используемые технологии

- Node.js
- Express

## Авторы

- [Michael Oladoye](https://github.com/jimike110)
