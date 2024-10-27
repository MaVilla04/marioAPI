// db config
const mongoose = require("mongoose");
const { personaje } = require("./mario.js");
const { user } = require("./user.js");

mongo().catch((err) => console.log(err));

async function mongo() {
  await mongoose.connect(`${process.env.MONGODB}`);
  console.log("MongoDB is connected!");
}

let jsonModels = {
  personaje: personaje(mongoose),
  user: user(mongoose),
};

exports.models = jsonModels;
