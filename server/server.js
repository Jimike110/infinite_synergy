const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// Middleware to enable CORS
app.use((req, res, next) => {
  // Make sure to replace with your own origin url
  res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


// Endpoint to fetch user data with pagination
app.get('/api/users', (req, res) => {
  // Get query parameters for pagination
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 1000; // Default limit to 1000 users per page if not provided

  fs.readFile('./data/users.json', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).json({ error: 'Failed to fetch data' });
    } else {
      const users = JSON.parse(data);

      // Calculate start and end indices for pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      // Get users for the current page
      const paginatedUsers = users.slice(startIndex, endIndex);

      res.json(paginatedUsers);
    }
  });
});

// Endpoint to update individual user data
app.patch('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedFields = req.body;

  fs.readFile('./data/users.json', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).json({ error: 'Failed to update user data' });
    } else {
      let users = JSON.parse(data);
      const index = users.findIndex(user => user.id === userId);
      if (index !== -1) {
        users[index] = { ...users[index], ...updatedFields };
        fs.writeFile('./data/users.json', JSON.stringify(users), (err) => {
          if (err) {
            console.error('Error writing to file:', err);
            res.status(500).json({ error: 'Failed to update user data' });
          } else {
            console.log('User data updated successfully');
            res.json({ message: 'User data updated successfully' });
          }
        });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
