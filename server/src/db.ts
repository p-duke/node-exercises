const Pool = require("pg").Pool;

const pool = new Pool({
  user: "peterduke",
  password: "",
  host: "localhost",
  port: 5432,
  database: "todo",
});

module.exports = pool;
