const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const PORT = 3000;

server.listen(PORT);
console.log("listening on port" + PORT);

let readyPlayerCOunt = 0;

io.on("connection", (socket) => {
  console.log("user connected... " + socket.id);

  socket.on("ready", () => {
    console.log("Player ready", socket.id);

    readyPlayerCOunt++;
    console.log(readyPlayerCOunt);

    if (readyPlayerCOunt % 2 === 0) {
      io.emit("startGame", socket.id);
    }
  });

  socket.on("paddleMove", (paddleData) => {
    socket.broadcast.emit("paddleMove", paddleData);
  });

  socket.on("ballMove", (ballData) => {
    socket.broadcast.emit("ballMove", ballData);
  });

  socket.on("disconnect", (reason) => {
    console.log(`CLient ${socket.id} disconnected for ${reason}`);
  });
});
