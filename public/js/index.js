const socket = io("/");

socket.on("frame", (data) => {
    console.log(data,"data")
    // document.getElementById("robotcam")
});


document.getElementById("forward").onmousedown=function() {
  socket.emit("forward", "forward");
  console.log("forward")
};
document.getElementById("backward").onmousedown=function() {
  socket.emit("backward", "backward");
  console.log("backward")
};
document.getElementById("strafeleft").onmousedown=function() {
  socket.emit("strafe left", "strafe left");
  console.log("strafe left")
};
document.getElementById("straferight").onmousedown=function() {
  socket.emit("strafe right", "strafe right");
  console.log("strafe right")
};
document.getElementById("rotateleft").onmousedown=function() {
  socket.emit("rotate left", "rotate left");
  console.log("rotate left")
};
document.getElementById("rotateright").onmousedown=function() {
  socket.emit("rotate right", "rotate right");
  console.log("rotate right")
};
document.getElementById("forward").onmouseup=function() {
  socket.emit("stop forward", "stop forward");
  console.log("stop forward")
};
document.getElementById("backward").onmouseup=function() {
  socket.emit("stop backward", "stop backward");
  console.log("stop backward")
};
document.getElementById("strafeleft").onmouseup=function() {
  socket.emit("stop strafe left", "stop strafe left");
  console.log("stop strafe left")
};
document.getElementById("straferight").onmouseup=function() {
  socket.emit("stop strafe right", "stop strafe right");
  console.log("stop strafe right")
};
document.getElementById("rotateleft").onmouseup=function() {
  socket.emit("stop rotate left", "stop rotate left");
  console.log("stop rotate left")
};
document.getElementById("rotateright").onmouseup=function() {
  socket.emit("stop rotate right", "stop rotate right");
  console.log("stop rotate right")
};
