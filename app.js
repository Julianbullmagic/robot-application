const { createServer } = require("http");

const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

const port = process.env.PORT || 3000;

app.use(express.static("public"));

let activeUsers = [];
let robot=""
io.on("connection", (socket) => {
    socket.on("frame", (data) => {
        io.emit("frame",Buffer.from(data, 'base64').toString());
    });
    socket.on("forward", () => {
      console.log("forward")
      console.log(robot,"robot")
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
    socket.on("diagonal left", () => {
        console.log("diagonal left")
        io.emit("diagonal left");
    });
    socket.on("diagonal right", (data) => {
        console.log("diagonal right")
        io.emit("diagonal right");
    });
    socket.on("diagonal back left", (data) => {
        console.log("diagonal back left")
        io.emit("diagonal back left");
    });
    socket.on("diagonal back right", (data) => {
        console.log("diagonal back right")
        io.emit("diagonal back right");
    });


    socket.on("stop diagonal left", () => {
        console.log("stop diagonal left")
        io.emit("stop diagonal left");
    });
    socket.on("stop diagonal right", (data) => {
        console.log("stop diagonal right")
        io.emit("stop diagonal right");
    });
    socket.on("stop diagonal back left", (data) => {
        console.log("stop diagonal back left")
        io.emit("stop diagonal back left");
    });
    socket.on("stop diagonal back right", (data) => {
        console.log("stop diagonal back right")
        io.emit("stop diagonal back right");
    });
    socket.on("stop forward", (data) => {
        console.log("stop stop forward")
        io.emit("stop stop forward");
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

    socket.on("disconnect", () => {
      console.log("disconnect")
    });
});

server.listen(port, () => console.log(`Server is running on port ${port}`));
