let canvas = document.getElementById("canvas");
let context;
context = canvas.getContext("2d");

// canvas.width = window.innerWidth - 100;

context.fillRect(0, 0, 100, 100); //dibujara un rectangulo desde las coordenadas especificadas y el tamaño

context.strokeStyle = "red";
context.strokeRect(100, 100, 100, 100);

context.strokeStyle = "blue";
context.lineWidth = 5;
context.translate(300, 0);
context.strokeRect(100, 50, 50, 50);

context.rotate(45);
context.strokeStyle = "yellow";
context.strokeRect(0, 100, 100, 100);

context.strokeStyle = "blue";
//si se modifica una posicion o rotacion hay que volver a ponerla en negativo para "resetearla"
context.rotate(-45);
context.translate(-300, 0);
context.beginPath();
context.moveTo(0, 250);
context.lineTo(100, 10);
context.lineTo(100, 100);
context.lineTo(20, 100);

context.strokeStyle = "red";
context.closePath();
context.stroke();
