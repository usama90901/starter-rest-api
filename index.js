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

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// #############################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
// var options = {
//   dotfiles: 'ignore',
//   etag: false,
//   extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
//   index: ['index.html'],
//   maxAge: '1m',
//   redirect: false
// }
// app.use(express.static('public', options))
// #############################################################################

// Create or Update an item
app.post('/:col/:key', async (req, res) => {
  console.log(req.body)

  const col = req.params.col
  const key = req.params.key
  console.log(`from collection: ${col} delete key: ${key} with params ${JSON.stringify(req.params)}`)
  const item = await db.collection(col).set(key, req.body)
  console.log(JSON.stringify(item, null, 2))
  res.json(item).end()
})

// Delete an item
app.delete('/:col/:key', async (req, res) => {
  const col = req.params.col
  const key = req.params.key
  console.log(`from collection: ${col} delete key: ${key} with params ${JSON.stringify(req.params)}`)
  const item = await db.collection(col).delete(key)
  console.log(JSON.stringify(item, null, 2))
  res.json(item).end()
})

// Get a single item
app.get('/:col/:key', async (req, res) => {
  const col = req.params.col
  const key = req.params.key
  console.log(`from collection: ${col} get key: ${key} with params ${JSON.stringify(req.params)}`)
  const item = await db.collection(col).get(key)
  console.log(JSON.stringify(item, null, 2))
  res.json(item).end()
})

// Get a full listing
app.get('/:col', async (req, res) => {
  const col = req.params.col
  console.log(`list collection: ${col} with params: ${JSON.stringify(req.params)}`)
  const items = await db.collection(col).list()
  console.log(JSON.stringify(items, null, 2))
  res.json(items).end()
})

// Catch all handler for all other request.
app.use('*', (req, res) => {
  res.json({ msg: 'MUI appication is running' }).end()
})

// Start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`index.js listening on ${port}`)
})
