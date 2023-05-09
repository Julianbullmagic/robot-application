const socket = io("/");

let detectingObjects=false

socket.on("frame", (data) => {
let img=document.getElementById('robotcam')
img.src = `data:image/jpeg;base64,${data}`
detect(img)
});

async function detect(image){
  const model = await cocoSsd.load();
  const predictions = await model.detect(image);
  console.log('Predictions: ',predictions);
  if (predictions){
    let canvas=document.getElementById('robotcanvas')
    let ctx = canvas.getContext('2d');
    ctx.font = "20px Georgia";
    ctx.strokeStyle = "blue";
    for (let pred of predictions){
      if (pred.score>0.5){
        ctx.beginPath();
        ctx.fillText(pred.class, pred.bbox[0]+10, pred.bbox[1]+10);
        ctx.rect(pred.bbox[0], pred.bbox[1], pred.bbox[2], pred.bbox[3]);
        ctx.stroke();
      }
    }
  }
}


document.getElementById("detectObjects").onmousedown = function() {
  detectingObjects=!detectingObjects
  console.log("detecting objects now")
}

document.getElementById("myRange").oninput = function() {
  document.getElementById("demo").innerHTML = this.value;
  socket.emit("change speed", this.value);
  console.log("changingspeed",this.value)
}

document.getElementById("topmiddle").onmousedown=function() {
  socket.emit("forward", "forward");
  console.log("forward")
};
document.getElementById("bottommiddle").onmousedown=function() {
  socket.emit("backward", "backward");
  console.log("backward")
};
document.getElementById("topleft").onmousedown=function() {
  socket.emit("diagonal left", "diagonal left");
  console.log("diagonal left")
};
document.getElementById("topright").onmousedown=function() {
  socket.emit("diagonal right", "diagonal right");
  console.log("diagonal right")
};
document.getElementById("bottomleft").onmousedown=function() {
  socket.emit("diagonal back left", "diagonal back left");
  console.log("diagonal back left")
};
document.getElementById("bottomright").onmousedown=function() {
  socket.emit("diagonal back right", "diagonal back right");
  console.log("diagonal back right")
};

document.getElementById("topmiddle").onmousedown=function() {
  socket.emit("forward", "forward");
  console.log("forward")
};
document.getElementById("bottommiddle").onmousedown=function() {
  socket.emit("backward", "backward");
  console.log("backward")
};
document.getElementById("middleleft").onmousedown=function() {
  socket.emit("strafe left", "strafe left");
  console.log("strafe left")
};
document.getElementById("middleright").onmousedown=function() {
  socket.emit("strafe right", "strafe right");
  console.log("strafe right")
};
document.getElementById("left").onmousedown=function() {
  socket.emit("rotate left", "rotate left");
  console.log("rotate left")
};
document.getElementById("right").onmousedown=function() {
  socket.emit("rotate right", "rotate right");
  console.log("rotate right")
};
document.getElementById("topmiddle").onmouseup=function() {
  socket.emit("stop forward", "stop forward");
  console.log("stop forward")
};
document.getElementById("bottommiddle").onmouseup=function() {
  socket.emit("stop backward", "stop backward");
  console.log("stop backward")
};
document.getElementById("middleleft").onmouseup=function() {
  socket.emit("stop strafe left", "stop strafe left");
  console.log("stop strafe left")
};
document.getElementById("middleright").onmouseup=function() {
  socket.emit("stop strafe right", "stop strafe right");
  console.log("stop strafe right")
};
document.getElementById("left").onmouseup=function() {
  socket.emit("stop rotate left", "stop rotate left");
  console.log("stop rotate left")
};
document.getElementById("right").onmouseup=function() {
  socket.emit("stop rotate right", "stop rotate right");
  console.log("stop rotate right")
};
document.getElementById("topleft").onmouseup=function() {
  socket.emit("stop diagonal left", "stop diagonal left");
  console.log("stop diagonal left")
};
document.getElementById("topright").onmouseup=function() {
  socket.emit("stop diagonal right", "stop diagonal right");
  console.log("stop diagonal right")
};
document.getElementById("bottomleft").onmouseup=function() {
  socket.emit("stop diagonal back left", "stop diagonal back left");
  console.log("stop diagonal back left")
};
document.getElementById("bottomright").onmouseup=function() {
  socket.emit("stop diagonal back right", "stop diagonal back right");
  console.log("stop diagonal back right")
};
