const path = require("path");
const dotenvPath = path.resolve(__dirname, "../../.env");
require("dotenv").config({ path: dotenvPath });
module.exports = {
  development: {
    client: "pg", // PostgreSQL client
    connection: {
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE_LIST,
    },
  },
};
