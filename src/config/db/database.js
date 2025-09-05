const dotenv = require("dotenv");
dotenv.config();

let dbConfig;

if (process.env.DB_DIALECT === "sqlite") {
  dbConfig = {
    dialect: "sqlite",
    storage: process.env.DB_STORAGE || "database.sqlite",
  };
} else {
  dbConfig = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  };
}

module.exports = {
  [process.env.NODE_ENV || "development"]: dbConfig,
};
