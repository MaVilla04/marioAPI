const express = require("express");
const routes = require("./routes/mariosTrans");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { authenticateToken, generateAccessToken } = require("./helpers/auth");
const http = require("http");

dotenv.config();
const { models } = require("./models");
const { ioSocket } = require("./rtc/server");
const initSocket = require("./rtc/socket");
const { Server } = require("socket.io");

const transformations = [
  {
    name: "Fire Mario",
    powerUp: "Fire Flower",
    hability: "Throw fireballs",
  },
  {
    name: "Super Mario",
    item: "Super Mushroom",
    hability: "Increased size and strength",
  },
  {
    name: "Tanooki Mario",
    item: "Super Leaf",
    hability: "Fly and turn into a statue",
  },
  {
    name: "Cat Mario",
    item: "Super Bell",
    hability: "Climb walls and scratch enemies",
  },
  {
    name: "Bee Mario",
    item: "Bee Mushroom",
    hability: "Fly and stick to honeycomb walls",
  },
  {
    name: "Penguin Mario",
    item: "Penguin Suit",
    hability: "Slide on ice and swim better",
  },
  {
    name: "Metal Mario",
    item: "Metal Cap",
    hability: "Invincibility and walk underwater",
  },
  {
    name: "Boomerang Mario",
    item: "Boomerang Flower",
    hability: "Throw boomerangs to hit enemies",
  },
  {
    name: "Ice Mario",
    item: "Ice Flower",
    hability: "Throw ice balls to freeze enemies",
  },
  {
    name: "Flying Squirrel Mario",
    item: "Super Acorn",
    hability: "Glide and cling to walls",
  },
];

const server = http.createServer(app);

app.use(express.json());
app.use(cors());

const io = ioSocket(server);
initSocket(io);

routes.marioTransform(
  app,
  models,
  authenticateToken,
  generateAccessToken,
  jwt,
  initSocket
);

server.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${process.env.PORT}`);
});
