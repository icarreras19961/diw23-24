$(document).ready(function () {
  console.log("Loaded");
  /*
  $("p"); //dentro se ponen selectores css
  $("h1 + p"); //me devuelve el primer hijo despues de h1 que sea 1 p
  $("h1 ~ p"); //coge todos los hermanos de h1 que sean una p
*/

  $("div:has(.container)").css("background-color", "yellow");
  $("div:contains(Titulo)").addClass("patata");
  $("main :hidden").show();
  $("#sendInfo").on({
    click: function () {
      console.log("hola");
      console.log(("#num").val());
    },
    mouseover: () => {
      console.log("adios");
    },
  });
  $("#sendInfo").on("click", { name: "ivan" }, test);//se tiene que enviar cosas asi sino no va


});

function test(event) {
  console.log(event.data.name);
}
