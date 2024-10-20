const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
const { models } = require("./models");

app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${process.env.PORT}`);
});
