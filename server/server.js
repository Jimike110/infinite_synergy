const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// Middleware to enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://legendary-barnacle-9rq6jr9pg7qcx4x4-3000.app.github.dev');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Endpoint to fetch user data
app.get('/api/users', (req, res) => {
  fs.readFile('./data/users.json', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).json({ error: 'Failed to fetch data' });
    } else {
      const users = JSON.parse(data);
      res.json(users);
    }
  });
});

// Endpoint to update user data
app.put('/api/users', (req, res) => {
  const updatedUsers = req.body;

  fs.writeFile('./data/users.json', JSON.stringify(updatedUsers), (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      res.status(500).json({ error: 'Failed to update data' });
    } else {
      console.log('Data updated successfully');
      res.json({ message: 'Data updated successfully' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
