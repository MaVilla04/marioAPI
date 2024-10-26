exports.personaje = (odm) => {
  const personajeSchema = new odm.Schema({
    name: { type: String, required: true },
    powerUp: { type: String },
    hability: { type: String },
    imageUrl: { type: String },
  });

  return odm.model("personaje", personajeSchema);
};
