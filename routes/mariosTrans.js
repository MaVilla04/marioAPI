const { personaje } = require("../models/mario");

const rutaBase = "/marioTransformations";

exports.marioTransform = (app, models) => {
  app.get(`${rutaBase}`, async (req, res) => {
    try {
      const transformations = await models.personaje.find().sort({ _id: -1 });
      res.json(transformations);
    } catch (error) {
      res.status(500).json({ msg: "Error al obtener las transformaciones" });
    }
  });

  app.post(`${rutaBase}/new`, async (req, res) => {
    if (
      !req.body.name ||
      !req.body.powerUp ||
      !req.body.hability ||
      !req.body.imageUrl
    ) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const mario = {
      name: req.body.name,
      powerUp: req.body.powerUp,
      hability: req.body.hability,
      imageUrl: req.body.imageUrl,
    };

    try {
      const newMario = await models.personaje.create(mario);
      res.status(201).json(newMario);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  //app.put(`${rutaBase}/:id`, async (req, res) => {});
};
