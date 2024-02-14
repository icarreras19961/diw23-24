$(document).ready(function () {
  let nPeruano = 0;
  let peruano;

  $("#peruaneitor").on("click", (e) => {
    let nx = Math.floor(Math.random() * (350 - 1) + 1);
    let ny = Math.floor(Math.random() * (350 - 1) + 1);
    if ($("#selector option:selected").val() == "peruano") {
      peruano = $(persona("peruano", nx, ny, "alfredo.png"));
      $("#peruspawn").after(peruano);
      peruano.data("encasa", false);
      peruano.draggable();
    } else if ($("#selector option:selected").val() == "argentino") {
      let argentino = $(persona("argentino", nx, ny, "pollito.avif"));
      $("#peruspawn").after(argentino);
      argentino.draggable();
    }
    $("#cerrar").on("click", (e) => {
      console.log($(e));
      $(e).addClass("hola")
      console.log($(this).find("argentino"));
      // peruano.remove();
    });
  });

  $("#peru").droppable({
    accept: ".peruano",
    drop: function (e) {
      if (peruano.data("encasa") == false) {
        peruano.data("encasa", true);
        nPeruano++;
      }
      $(this).text(nPeruano);
    },
    out: function () {
      if (peruano.data("encasa") == true) {
        peruano.data("encasa", false);
        nPeruano--;
      }
      $(this).text(nPeruano);
    },
  });

  function persona(classe, nx, ny, img) {
    return `<div class="${classe}" style='left:${nx}px; top:${ny}px;'>
    <button id="change">--</button>
    <button id="cerrar">X</button>
    <img src=${img} alt="" />
    </div>`;
  }
});
