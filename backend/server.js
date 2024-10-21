const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Create a SQLite database
const db = new sqlite3.Database('./cs2-skin-marketplace.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Create a table for skins
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS skins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL
  )`);
});

// Endpoint to add a new skin
app.post('/skins', (req, res) => {
  const { name, description, price } = req.body;
  db.run(`INSERT INTO skins (name, description, price) VALUES (?, ?, ?)`, [name, description, price], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
});

// Endpoint to get all skins
app.get('/skins', (req, res) => {
  db.all(`SELECT * FROM skins`, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
