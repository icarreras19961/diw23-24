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
context.beginPath();

//Las palabras
context.font = "bold 30px serif";
context.fillText("Units",50,200);
context.fillText("Basketball",160,440);
context.fillText("Baseball",320,440);
context.fillText("Football",480,440);
context.fillText("Products",  300,500);

//Las flechitas
context.moveTo(150, 0);
context.lineTo(150,400);
context.lineTo(700,400);

context.stroke();
