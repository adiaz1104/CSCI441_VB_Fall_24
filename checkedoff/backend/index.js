require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const db = require('./db');  // Import the database connection module

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Simple route to test the server
app.get('/', (req, res) => {
  res.send('Welcome to CheckedOff backend!');
});

// Route to get events (example route)
app.get('/events', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM event');  // Query to fetch all events
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);  // Log error for debugging
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to add an event
app.post('/events', async (req, res) => {
  const { title, start, end, user_id, description } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO event (title, start_datetime, end_datetime, user_id, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, start, end, user_id, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);  // Log error for debugging
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
