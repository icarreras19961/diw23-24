let canvas;
let context;
canvas = document.getElementById("canvas");
context = canvas.getContext("2d");
let img = new Image();
img.src = "dvd-audio-logo.png";
let movedor;
//Los botones
let start = document.getElementById("start");
let stop = document.getElementById("stop");
let ejeX = document.getElementById("ejeX");
let ejeY = document.getElementById("ejeY");

function drawImage(x, y) {
  context.beginPath();
  context.drawImage(img, x, y, 150, 100);
  context.fill();
}

function clearCanvas() {
  canvas.width = canvas.width;
}

var ballX = 60;
var ballY = 60;
var directionX = 2;
var directionY = 2;

start.addEventListener("click", (e) => {
  movedor = setInterval(function () {
    if (ballX > 860 || ballX < 0) {
      directionX *= -1;
    }
    if (ballY < 0 || ballY > 500) {
      directionY *= -1;
    }
    ballX += directionX;
    ballY += directionY;
    clearCanvas();
    drawImage(ballX, ballY);
  }, 35);
  start.style.display="none";
  stop.style.display="block";

});
stop.addEventListener("click", (e) => {
  clearInterval(movedor);
  stop.style.display="none";
  start.style.display="block";
});
drawImage(ballX, ballY);