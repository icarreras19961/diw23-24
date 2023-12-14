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
let enviar = document.getElementById("enviar");
let ejeX = document.getElementById("ejeX");
let ejeY = document.getElementById("ejeY");
let eje_X = document.getElementById("eje-X");
let eje_Y = document.getElementById("eje-Y");

function drawImage(x, y) {
  context.beginPath();
  context.drawImage(img, x, y, 150, 100);
  context.fill();
}

function clearCanvas() {
  canvas.width = canvas.width;
}

var ballX = 0;
var ballY = 0;
var directionX = 2;
var directionY = 2;


start.addEventListener("click", (e) => {
  ballX = 0;
  ballY = 0;
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
  stop.style.display = "block";
});
stop.addEventListener("click", (e) => {
  clearInterval(movedor);
  stop.style.display = "none";
  start.style.display = "block";
});
ejeX.addEventListener("click", (e) => {
  directionX += 1;
  console.log(directionX);
});
ejeY.addEventListener("click", (e) => {
  directionY += 1;
  console.log(directionY);
});
eje_X.addEventListener("click", (e) => {
  directionX -= 1;
  console.log(directionX);
});
eje_Y.addEventListener("click", (e) => {
  directionY -= 1;
  console.log(directionY);
});
drawImage(ballX, ballY);