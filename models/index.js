// db config
const mongoose = require("mongoose");
const { personaje } = require("./mario.js");

mongo().catch((err) => console.log(err));

async function mongo() {
  await mongoose.connect(`${process.env.MONGODB}`);
  console.log("Db connected!");
}

let jsonModels = {
  personaje: personaje(mongoose),
};

exports.models = jsonModels;
