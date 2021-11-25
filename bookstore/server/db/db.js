const { Pool } = require("pg");

let pool = new Pool({
  host: "localhost",
  port: "5432",
  database: "vamsi",
  user: "vamsi",
  password: "vamsi",
});

module.exports = pool;
