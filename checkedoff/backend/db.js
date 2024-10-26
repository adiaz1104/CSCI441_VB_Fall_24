require('dotenv').config();  // Load environment variables from .env file
const { Pool } = require('pg');

// Configure the PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectionString: process.env.DB_URI,  // Use connection string if provided
  ssl: {
    rejectUnauthorized: false,  // Ensure proper SSL connection
  },
});

// Export the query method for executing SQL queries
module.exports = {
  query: (text, params) => pool.query(text, params),
};
