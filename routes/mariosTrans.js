const rutaBase = "/marioTransformations";

exports.mario = (app, transformations) => {
  app.get(`${rutaBase}`, async (req, res) => {
    try {
      const transformations = await Transformation.find().sort({ _id: -1 }); //ordena por ID desde el más antiguo al más reciente
      res.json(transformations);
    } catch (error) {
      res.status(500).json({ msg: "Error al obtener las transformaciones" });
    }
  });

  app.post = (`${rutaBase}`, async (req, res) => {});
};
