exports.authenticateToken = (req, res, next, jwt) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
};
exports.generateAccessToken = (data, jwt) => {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1800s" });
};
