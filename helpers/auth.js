const jwt = require("jsonwebtoken");
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  let token;
  if (authHeader != null && authHeader != undefined) {
    const parts = authHeader && authHeader.split(" ");
    if (parts.length == 2 && parts[0] == "Bearer") {
      token = parts[1];
    }
  }

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    //console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
};
exports.generateAccessToken = (data, jwt) => {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1800s" });
};
