const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

// Check database connection
db.raw("SELECT 1")
  .then(() => {
    console.log("Database connection is established.");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
