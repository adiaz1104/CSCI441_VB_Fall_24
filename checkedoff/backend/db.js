require('dotenv').config();  // Load environment variables from .env file
const { Pool } = require('pg');

// Log environment variables to ensure they are being read correctly
console.log("Database connection details:");
console.log(`Host: ${process.env.DB_HOST}`);
console.log(`User: ${process.env.DB_USER}`);
console.log(`Password: ${process.env.DB_PASSWORD}`);
console.log(`Database: ${process.env.DB_NAME}`);
console.log(`Port: ${process.env.DB_PORT}`);

// Configure the PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: false  // Completely disable SSL connection
});

// Export the query method for executing SQL queries
module.exports = {
  query: (text, params) => pool.query(text, params),
};
