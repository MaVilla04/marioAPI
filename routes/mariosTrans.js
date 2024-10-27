const rutaBase = "/marioTransformations";

exports.marioTransform = (
  app,
  models,
  authenticateToken,
  generateAccessToken,
  jwt,
  io
) => {
  io.on("connection", (socket) => {
    console.log("Usuario conectado");

    socket.on("disconnect", () => {
      console.log("Usuario desconectado");
    });
  });

  app.get(`${rutaBase}`, async (req, res) => {
    try {
      const transformations = await models.personaje.find().sort({ _id: -1 });
      res.json(transformations);
    } catch (error) {
      res.status(500).json({ msg: "Error al obtener las transformaciones" });
    }
  });

  app.post(`${rutaBase}/new`, authenticateToken, async (req, res) => {
    if (
      !req.body.name ||
      !req.body.powerUp ||
      !req.body.hability ||
      !req.body.imageUrl
    ) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const marioExist = await models.personaje.exists({ name: req.body.name });
    if (!marioExist) {
      try {
        const newMario = await models.personaje.create({
          name: req.body.name,
          powerUp: req.body.powerUp,
          hability: req.body.hability,
          imageUrl: req.body.imageUrl,
        });
        res.status(201).json(newMario);
        //server.emit("newMario", newMario);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    } else {
      return res.json({ message: "El elemento ya existe" });
    }
  });

  app.put(`${rutaBase}/update/:id`, authenticateToken, async (req, res) => {
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

  app.delete(`${rutaBase}/delete/:id`, authenticateToken, async (req, res) => {
    try {
      let mario = await models.personaje.findById(req.params.id);
      if (!mario) {
        return res
          .status(404)
          .json({ message: "Transformación no encontrada" });
      }

      const deletedMario = await models.personaje.deleteOne(mario);
      res.json(deletedMario);
      //server.emit("deletedMario", deletedMario);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post(`${rutaBase}/newUser`, async (req, res) => {
    if (!req.body.name || !req.body.email) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const userExists = await models.user.exists({ name: req.body.name });
    if (!userExists) {
      try {
        const newUser = await models.user.create({
          name: req.body.name,
          email: req.body.email,
        });

        let jwtSignature = await generateAccessToken(
          { email: newUser.email },
          jwt
        );

        res
          .status(201)
          .json({ name: newUser.name, email: newUser, token: jwtSignature });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    } else {
      return res.json({ message: "El usuario ya existe" });
    }
  });
};
