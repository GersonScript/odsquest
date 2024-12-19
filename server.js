const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log(`Player connected: ${socket.id}`);

  // Notify all clients about the new player
  io.emit("playerConnected", { id: socket.id });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`Player disconnected: ${socket.id}`);
    io.emit("playerDisconnected", { id: socket.id });
  });
});

server.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
