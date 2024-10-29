const rutaBase = "/marioTransformations";
const bcrypt = require("bcryptjs");
const { json } = require("express");

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
    if (!req.body.name || !req.body.password) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const userExists = await models.user.exists({ name: req.body.name });

    if (!userExists) {
      try {
        const bcryptPass = await bcrypt.hash(req.body.password, 10);
        const newUser = await models.user.create({
          name: req.body.name,
          password: bcryptPass,
        });

        res
          .status(201)
          .json({ name: newUser.name, password: newUser.password });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    } else {
      return res.json({ message: "El usuario ya existe" });
    }
  });

  app.post(`${rutaBase}/login`, async (req, res) => {
    const { name, password } = req.body;

    try {
      const userID = await models.user.exists({ name: name });
      if (!userID) {
        return res.status(404).json({ message: "El usuario no existe" });
      }
      const userExists = await models.user.findById(userID);
      console.log("contraseña: ", await bcrypt.hash(password, 10));
      const validPass = await bcrypt.compare(password, userExists.password);
      if (!validPass) {
        return res.status(401).json({ message: "contraseña incorrecta" });
      }
      const token = generateAccessToken(
        { id: userExists._id, user: userExists.name },
        jwt
      );
      res.json({ message: "Has iniciado correctamente", token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error al iniciar sesión", error });
    }
  });
};
