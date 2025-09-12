const express = require("express");
const { testConnection } = require("../config/db/connection");
const routes = require("../routes/index.js");
const { notFoundResponse } = require("../utils/responses");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use((res, req, next) => {
  notFoundResponse(res, "Route not found");
});

const startServer = async () => {
  await testConnection();

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

module.exports = startServer;
