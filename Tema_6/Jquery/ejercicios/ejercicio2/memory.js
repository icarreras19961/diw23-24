$(document).ready(function () {
  console.log("Loaded");

  let ncards = Math.floor(Math.random() * (24 - 12) + 12);
  let arrayJuego = [];
  let tries = [];
  let selecFrog = [];
  let ntries = 0;
  let score = 0;
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
  $(".frog").on("click", function (e) {
    $(this).addClass("check");
    // console.log($(this).text());
    tries[ntries] = $(this).text();
    selecFrog[ntries] = $(this);
    if (ntries == 1) {
      ntries = 0;
    } else {
      ntries++;
    }
    console.log("n: " + ntries);
    analizator(tries, selecFrog);
  });

  function analizator(tries, selecFrog) {
    console.log(tries.length);
    if (tries.length == 2) {
      console.log(tries);
      setTimeout(function () {
        console.log("hola");
        comprobador(tries, selecFrog);
        tries.splice(0, tries.length);
      }, 500);
    }
    console.log(tries);
  }

  function comprobador(tries, selecFrog) {
    let n1 = tries[0];
    let n2 = tries[1];
    if (n1 == n2) {
      score++;
      console.log("puntos " + score);
    } else {
      selecFrog[0].removeClass("check");
      selecFrog[1].removeClass("check");
    }
    if (score == ncards / 2) {
    alert("You Win :D")
    }
  }
});
