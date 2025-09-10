const express = require("express");
const { testConnection } = require("../config/db/connection");
const routes = require("../routes/index.js");

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

module.exports = startServer;
