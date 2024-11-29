const { Server } = require("socket.io");

exports.ioSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  return io;
};
