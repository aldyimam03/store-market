const express = require("express");
const { testConnection } = require("./src/config/db/connection");
const routes = require("./src/routes/index.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", routes);

const startServer = async () => {
  await testConnection();

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

startServer();

module.exports = app;