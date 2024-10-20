const rutaBase = "/mariosTransformations";

exports.mario = (app, transformations) => {
  app.get(`${rutaBase}`, (req, res) => {
    res.json(transformations);
  });
};
