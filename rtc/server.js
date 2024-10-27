const http = require("http");

exports.ioSocket = (app) => {
  const server = http.createServer(app);

  const Server = require("socket.io")(server, {
    cors: {
      origin: ["*", "localhost", "http://localhost, http://localhost:8081"],
      methods: ["GET", "POST"],
    },
  }).listen(8081);

  return Server;
};
