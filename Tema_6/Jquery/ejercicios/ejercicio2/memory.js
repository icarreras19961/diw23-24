$(document).ready(function () {
  console.log("Loaded");

  let ncards = Math.floor(Math.random() * (24 - 12) + 12);
  let arrayJuego = [];
  let tries = [];
  let ntries = 0;
  if (ncards % 2 != 0) {
    ncards++;
  }

  rellenador(arrayJuego, ncards);
  console.log(arrayJuego);
  //Fill the desk with the frogs
  for (let i = 1; i <= ncards; i++) {
    $("#bodyMem").append(
      `<div class="frog"><img src="imagenes/Original.png" class="img_frog"><span class="number">${
        arrayJuego[i - 1]
      }</span></div>`
    );
  }

  //Fill the array with random numbers that are extract on the half of the ncard value
  function rellenador(arrayJuego, ncards) {
    console.log(arrayJuego, ncards);
    for (let i = 1; i <= ncards / 2; i++) {
      arrayJuego[i] = i;
    }
    for (let i = 1; i <= ncards / 2; i++) {
      arrayJuego.push(i);
    }
    arrayJuego = arrayJuego.sort(() => {
      return Math.random() - 0.5;
    });
  }

  //The listeners that you click and do thinks
  $(".frog").on("click",  function(e) {
    $(this).addClass("check");
    // console.log($(this).text());
    tries[ntries] = $(this).text();
    ntries++;
    analizator(tries);
  });

  function analizator(tries) {
    console.log(tries.length);
    if (tries.length == 2) {
      tries.splice();
    }
    console.log(tries);
  }
});
