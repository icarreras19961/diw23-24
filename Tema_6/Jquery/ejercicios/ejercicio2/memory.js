$(document).ready(function () {
  console.log("Loaded");

  let ncards = Math.floor((Math.random() * 20) / 2) * 2 + 2;

  let arrayJuego = [];

  console.log(ncards);
  rellenador(arrayJuego, ncards);
  console.log(arrayJuego);
  for (let i = 1; i <= ncards; i++) {
    $("#bodyMem").append(
      `<div class="rana"><img src="imagenes/Original.png"><span class="number">${
        arrayJuego[i - 1]
      }</span></div>`
    );
  }

  function rellenador(arrayJuego, ncards) {
    console.log(arrayJuego, ncards);
    for (let i = 1; i <= ncards / 2; i++) {
      arrayJuego[i] = i;
    }
    for (let i = 1; i <= ncards / 2; i++) {
      arrayJuego.push(i);
    }
    arrayJuego = arrayJuego.sort(() => {
      return Math.random() * -0.5;
    });
  }
  $(".rana").on("click", (e)=> {
    $(".number").css("display", "block");
  });
});
