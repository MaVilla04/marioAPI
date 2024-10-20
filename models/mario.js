exports.personaje = (odm) => {
  const personajeSchema = new odm.Schema({
    name: String,
    item: String,
    hability: String,
    image: String,
  });

  return odm.model("personaje", personajeSchema);
};
