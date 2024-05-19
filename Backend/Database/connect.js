const { Pool } = require('pg');
require('dotenv').config({path: __dirname + '/.env'}); 

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

module.exports = pool;