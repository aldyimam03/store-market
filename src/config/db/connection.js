const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

let sequelize;

if (process.env.DB_DIALECT === "sqlite") {
  // Config SQLite
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: process.env.DB_STORAGE || "database.sqlite",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
  });
} else {
  // Config MySQL/Postgres/MariaDB/Tedious (Microsoft SQL Server)/OracleDB (Oracle Database)
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: process.env.DB_DIALECT,
      logging: process.env.NODE_ENV === "development" ? console.log : false,
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      dialectOptions:
        process.env.DB_DIALECT === "mysql" ? { connectTimeout: 60000 } : {},
    }
  );
}

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
