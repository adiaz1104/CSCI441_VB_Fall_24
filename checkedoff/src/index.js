//written by: Cody Hinz and Nathan Diaz
//tested by: Cody Hinz and Nathan Diaz
//debugged by: Cody Hinz and Nathan Diaz

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

/*
// Route to get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM task');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
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
  } catch (error) {
    console.error(error);
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete a task
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM task WHERE id = $1', [id]);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to get all events
app.get('/events', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM event');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to add a new event
app.post('/events', async (req, res) => {
  const { calendar_id, title, description, start_datetime, end_datetime, location } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO event (calendar_id, title, description, start_datetime, end_datetime, location) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [calendar_id, title, description, start_datetime, end_datetime, location]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update an event
app.put('/events/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, start_datetime, end_datetime, location } = req.body;
  try {
    const result = await db.query(
      'UPDATE event SET title = $1, description = $2, start_datetime = $3, end_datetime = $4, location = $5 WHERE id = $6 RETURNING *',
      [title, description, start_datetime, end_datetime, location, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete an event
app.delete('/events/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM event WHERE id = $1', [id]);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to get all shopping list items
app.get('/shopping-items', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM shoppingitem');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to add a new shopping list item
app.post('/shopping-items', async (req, res) => {
  const { shopping_list_id, name, quantity } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO shoppingitem (shopping_list_id, name, quantity) VALUES ($1, $2, $3) RETURNING *',
      [shopping_list_id, name, quantity]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update a shopping list item
app.put('/shopping-items/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  try {
    const result = await db.query(
      'UPDATE shoppingitem SET name = $1, quantity = $2 WHERE id = $3 RETURNING *',
      [name, quantity, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete a shopping list item
app.delete('/shopping-items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM shoppingitem WHERE id = $1', [id]);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to get all recipes
app.get('/recipes', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM recipe');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to add a new recipe
app.post('/recipes', async (req, res) => {
  const { title, ingredients, instructions } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO recipe (title, ingredients, instructions) VALUES ($1, $2, $3) RETURNING *',
      [title, ingredients, instructions]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update a recipe
app.put('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  const { title, ingredients, instructions } = req.body;
  try {
    const result = await db.query(
      'UPDATE recipe SET title = $1, ingredients = $2, instructions = $3 WHERE id = $4 RETURNING *',
      [title, ingredients, instructions, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete a recipe
app.delete('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM recipe WHERE id = $1', [id]);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to get all documents
app.get('/documents', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM document');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to add a new document
app.post('/documents', async (req, res) => {
  const { title, content } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO document (title, content) VALUES ($1, $2) RETURNING *',
      [title, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update a document
app.put('/documents/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const result = await db.query(
      'UPDATE document SET title = $1, content = $2 WHERE id = $3 RETURNING *',
      [title, content, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete a document
app.delete('/documents/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM document WHERE id = $1', [id]);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

*/

/*import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();*/
