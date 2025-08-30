const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      setTimeout: 60000,
    },
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    console.log(`Running in ${process.env.NODE_ENV} mode`); 
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
};

module.exports = { sequelize, testConnection };
