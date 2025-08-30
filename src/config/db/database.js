const dotenv = require("dotenv");
dotenv.config();

let dbConfig;

if (process.env.NODE_ENV === "production") {
  dbConfig = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  };
} else if (process.env.NODE_ENV === "test") {
  dbConfig = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  };
} else {
  dbConfig = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  };
}

module.exports = {
  [process.env.NODE_ENV || "development"]: dbConfig,
};
