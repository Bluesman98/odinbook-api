
const { Server } = require("socket.io");
const PORT = process.env.PORT || 3000;
//Socket.io server

 socket = function (server){
const io = new Server(server, {
  cors: {
    origin: [PORT,"http://localhost:3001","https://bluesman98.github.io"],
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("Room id: ", data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log("send_message");
  });

  socket.on("send_notification", (user_id) => {
    socket.to(user_id).emit("receive_notification", user_id);
    console.log("send_notification");
  });
});

server.listen(PORT, () => {
  console.log("Socket.io sever running");
});
}

module.exports = socket

