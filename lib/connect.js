// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const mysql = require('mysql2');

// create the connection to database
const con = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

export default con;