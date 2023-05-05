const { createServer } = require("http");

const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

const port = process.env.PORT || 3000;

app.use(express.static("public"));

let activeUsers = [];

io.on("connection", (socket) => {

    const socketExist = activeUsers.find(
        (socketExist) => socketExist === socket.id
    );

    if (!socketExist) {
        activeUsers.push(socket.id);

        socket.emit("update-user-list", {
            users: activeUsers.filter(
                (socketExist) => socketExist !== socket.id
            ),
        });
        socket.broadcast.emit("update-user-list", { users: [socket.id] });
    }
    socket.emit("forward","forward");

    socket.on("forward", () => {
      console.log("forward")
        io.emit("forward","forward");
    });
    socket.on("backward", (data) => {
        socket.emit("backward");
    });
    socket.on("strafeleft", (data) => {
        socket.emit("strafe left");
    });
    socket.on("straferight", (data) => {
        socket.emit("strafe right");
    });
    socket.on("rotateleft", (data) => {
        socket.emit("rotate left");
    });
    socket.on("rotate right", (data) => {
        socket.emit("rotate right");
    });

    socket.on("stop forward", (data) => {
        socket.emit("foward");
    });
    socket.on("stop backward", (data) => {
        socket.emit("backward");
    });
    socket.on("stop strafe left", (data) => {
        socket.emit("strafe left");
    });
    socket.on("stop strafe right", (data) => {
        socket.emit("strafe right");
    });
    socket.on("stop rotate left", (data) => {
        socket.emit("rotate left");
    });
    socket.on("stop rotate right", (data) => {
        socket.emit("rotate right");
    });

    socket.on("call-user", (data) => {
        socket.to(data.to).emit("call-made", {
            offer: data.offer,
            socket: socket.id,
        });
    });

    socket.on("make-answer", (data) => {
        socket.to(data.to).emit("answer-made", {
            socket: socket.id,
            answer: data.answer,
        });
    });

    socket.on("reject-call", (data) => {
        socket.to(data.from).emit("call-rejected", {
            socket: socket.id,
        });
    });

    socket.on("disconnect", () => {
      console.log("disconnect")
        activeUsers = activeUsers.filter(
            (socketExist) => socketExist !== socket.id
        );

        socket.broadcast.emit("remove-user", {
            socketId: socket.id,
        });
    });
});

server.listen(port, () => console.log(`Server is running on port ${port}`));
