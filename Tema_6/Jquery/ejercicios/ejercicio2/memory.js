$(document).ready(function () {
  console.log("Loaded");

  let ncards = Math.floor((Math.random() * 20) / 2) * 2 + 2;
  console.log(ncards);
  for (let i = 1; i <= ncards; i++) {
    console.log("hola");
    $("#bodyMem").append('<div id="rana"><img src="imagenes/Original.png" alt=""></div>')
  }
});
