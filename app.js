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
    io.emit("forward");

    socket.on("forward", () => {
      console.log("forward")
        io.emit("forward");
    });
    socket.on("backward", () => {
      console.log("backward")
        io.emit("backward");
    });
    socket.on("strafe left", () => {
        console.log("strafe left")
        io.emit("strafe left");
    });
    socket.on("strafe right", (data) => {
        console.log("strafe right")
        io.emit("strafe right");
    });
    socket.on("rotate left", (data) => {
        console.log("rotate left")
        io.emit("rotate left");
    });
    socket.on("rotate right", (data) => {
        console.log("rotate right")
        io.emit("rotate right");
    });

    socket.on("stop forward", (data) => {
        console.log("stop forward")
        io.emit("stop forward");
    });
    socket.on("stop backward", (data) => {
        console.log("stop backward")
        io.emit("stop backward");
    });
    socket.on("stop strafe left", (data) => {
        console.log("stop strafe left")
        io.emit("stop strafe left");
    });
    socket.on("stop strafe right", (data) => {
        console.log("stop strafe right")
        io.emit("stop strafe right");
    });
    socket.on("stop rotate left", (data) => {
        console.log("stop rotate left")
        io.emit("stop rotate left");
    });
    socket.on("stop rotate right", (data) => {
        console.log("stop rotate right")
        io.emit("stop rotate right");
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
