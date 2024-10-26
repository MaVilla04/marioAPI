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

    try {
      const newMario = await models.personaje.create({
        name: req.body.name,
        powerUp: req.body.powerUp,
        hability: req.body.hability,
        imageUrl: req.body.imageUrl,
      });
      res.status(201).json(newMario);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  app.put(`${rutaBase}/update/:id`, async (req, res) => {
    try {
      let mario = await models.personaje.findById(req.params.id);
      if (!mario) {
        return res
          .status(404)
          .json({ message: "Transformación no encontrada" });
      }

      if (
        !req.body.name ||
        !req.body.powerUp ||
        !req.body.hability ||
        !req.body.imageUrl
      ) {
        return res.status(400).json({ message: "Faltan campos obligatorios" });
      }

      mario.name = req.body.name;
      mario.powerUp = req.body.powerUp;
      mario.hability = req.body.hability;
      mario.imageUrl = req.body.imageUrl;

      const updatedMario = await mario.save();
      res.json(updatedMario);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete(`${rutaBase}/delete/:id`, async (req, res) => {
    try {
      let mario = await models.personaje.findById(req.params.id);
      if (!mario) {
        return res
          .status(404)
          .json({ message: "Transformación no encontrada" });
      }

      const deletedMario = await models.personaje.deleteOne(mario);
      res.json(deletedMario);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};
