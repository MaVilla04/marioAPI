module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    socket.on("message", (msg) => {
      io.emit("message", msg);
      console.log("message ", msg);
    });

    socket.on("disconnect", () => {
      console.log(`Cliente desconectado: ${socket.id}`);
    });
  });
};
