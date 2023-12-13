let canvas = document.getElementById("canvas");
let context;
context = canvas.getContext("2d");
var sales = [
  {
    product: "Basketballs",
    units: 150,
  },
  {
    product: "Baseballs",
    units: 125,
  },
  {
    product: "Footballs",
    units: 300,
  },
];
console.log(sales[0].units);
context.beginPath();

//Las palabras
context.font = "bold 30px serif";
context.fillText("Units", 50, 200);
context.fillText(sales[0].product, 160, 440);
context.fillText(sales[1].product, 320, 440);
context.fillText(sales[2].product, 480, 440);
context.fillText("Products", 300, 500);

//Las flechitas
context.moveTo(150, 0);
context.lineTo(150, 400);
context.lineTo(700, 400);
context.stroke();

//Los valores

const grd = context.createLinearGradient(200, 400, 200, 80);
grd.addColorStop(0, "orange");
grd.addColorStop(1, "white");
context.fillStyle = grd;
context.fillRect(200, 400, 50, -(sales[0].units));

const grd2 = context.createLinearGradient(350, 400, 600, 0);
grd2.addColorStop(0, "blue");
grd2.addColorStop(1, "white");
context.fillStyle = grd2;
context.fillRect(350, 400, 50, -(sales[1].units));

const grd3 = context.createLinearGradient(500, 400, 600, 50);
grd3.addColorStop(0, "red");
grd3.addColorStop(1, "white");
context.fillStyle = grd3;
context.fillRect(500, 400, 50, -(sales[2].units));
