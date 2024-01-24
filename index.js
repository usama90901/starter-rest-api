const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ground_booking',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Define your API routes here

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Example API Route for User Registration
app.post('/api/user/register', (req, res) => {
    // Implement user registration logic here
    res.json({ message: 'User registered successfully' });
  });
  
  // Example API Route for Ground Details
  app.get('/api/ground/:id', (req, res) => {
    const groundId = req.params.id;
  
    // Query the database to fetch ground details
    const sql = 'SELECT * FROM grounds WHERE ground_id = ?';
  
    connection.query(sql, [groundId], (err, results) => {
      if (err) {
        console.error('Error fetching ground details:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      if (results.length === 0) {
        res.status(404).json({ error: 'Ground not found' });
      } else {
        const groundDetails = results[0];
        res.json(groundDetails);
      }
    });
  });
  
  
  // Add more routes as needed
  
