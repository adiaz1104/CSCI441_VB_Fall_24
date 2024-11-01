require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const db = require('./db');  // Import the database connection module

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

console.log('Setting up routes...');

// Simple route to test the server
app.get('/', (req, res) => {
  res.send('Welcome to CheckedOff backend!');
  console.log('Root route accessed');
});

// Route to get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM task');
    res.status(200).json(result.rows);
    console.log('Tasks fetched');
  } catch (error) {
    console.error('Error fetching tasks:', error.stack);  // Log the error stack trace
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to add a new task
app.post('/tasks', async (req, res) => {
  const { user_id, title, description, due_date, status } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO task (user_id, title, description, due_date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [user_id, title, description, due_date, status]
    );
    res.status(201).json(result.rows[0]);
    console.log('Task added');
  } catch (error) {
    console.error('Error adding task:', error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update a task
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, due_date, status } = req.body;
  try {
    const result = await db.query(
      'UPDATE task SET title = $1, description = $2, due_date = $3, status = $4 WHERE id = $5 RETURNING *',
      [title, description, due_date, status, id]
    );
    res.status(200).json(result.rows[0]);
    console.log('Task updated');
  } catch (error) {
    console.error('Error updating task:', error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete a task
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM task WHERE id = $1', [id]);
    res.status(204).end();
    console.log('Task deleted');
  } catch (error) {
    console.error('Error deleting task:', error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add similar route setups for events, shopping-items, recipes, and documents

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
