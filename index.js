const express = require('express');
const { sequelize, testConnection } = require('./src/config/db/connection');
const authRoutes = require("./src/routes/authRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/auth", authRoutes);

const startServer = async () => {
  await testConnection();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();

module.exports = app;