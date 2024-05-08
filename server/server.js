const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// Промежуточное ПО для включения CORS
app.use((req, res, next) => {
  // Разрешить запросы из источника, указанного в заголовке запроса.
  const origin = req.get('Origin');
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Конечная точка для получения пользовательских данных с пагинацией
app.get('/api/users', (req, res) => {
  // Получить параметры запроса для пагинации
  const page = parseInt(req.query.page) || 1; // По умолчанию страница 1, если она не указана
  const limit = parseInt(req.query.limit) || 1000; // Ограничение по умолчанию до 1000 пользователей на страницу, если это не указано

  fs.readFile('./data/users.json', (err, data) => {
    if (err) {
      console.error('Ошибка при чтении файла:', err);
      res.status(500).json({ error: 'Не удалось получить данные.' });
    } else {
      const users = JSON.parse(data);

      // Рассчитать начальный и конечный индексы для нумерации страниц
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      // Получить пользователей для текущей страницы
      const paginatedUsers = users.slice(startIndex, endIndex);

      res.json(paginatedUsers);
    }
  });
});

// Конечная точка для обновления индивидуальных данных пользователя
app.patch('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedFields = req.body;

  fs.readFile('./data/users.json', (err, data) => {
    if (err) {
      console.error('Ошибка при чтении файла:', err);
      res.status(500).json({ error: 'Не удалось получить данные.' });
    } else {
      let users = JSON.parse(data);
      const index = users.findIndex(user => user.id === userId);
      if (index !== -1) {
        users[index] = { ...users[index], ...updatedFields };
        fs.writeFile('./data/users.json', JSON.stringify(users), (err) => {
          if (err) {
            console.error('Ошибка записи в файл:', err);
            res.status(500).json({ error: 'Не удалось получить данные.' });
          } else {
            console.log('Данные пользователя успешно обновлены');
            res.json({ message: 'Данные пользователя успешно обновлены' });
          }
        });
      } else {
        res.status(404).json({ error: 'Пользователь не найден' });
      }
    }
  });
});


app.listen(PORT, () => {
  console.log(`Сервер работает на порту ${PORT}`);
});
