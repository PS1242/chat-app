const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");
const {
  users,
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./users");

const corsOptions = {
  cors: true,
  origins: ["http://localhost:3000"],
};

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server, corsOptions);

app.use(router);

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", {
      user: "admin",
      text: `${user.name} , welcome to the room ${user.room}`,
    });

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    console.log(`has left!`);

    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left!`,
      });
    }
  });
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
