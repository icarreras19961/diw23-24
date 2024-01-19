$(document).ready(function () {
  $("#genereitor").on("click", () => {
    let colorRand = Math.floor(Math.random() * (4 - 1) + 1);
    let colorClass;
    let ntooDo = 0;
    let ndoing = 0;
    let ndonete = 0;

    if (colorRand == 1) {
      colorClass = "red";
    } else if (colorRand == 2) {
      colorClass = "blue";
    } else if (colorRand == 3) {
      colorClass = "green";
    }
    $("#genereitor").after(`<div class='posit ${colorClass}'></div>`);
    $(".posit").draggable();
    $("#tooDo").droppable({
      accept: ".red",
      drop: function () {
        ntooDo++;
        $(this).find("span").text(ntooDo);
      },
    });
    $("#doing").droppable({
      accept: ".blue",
      drop: function () {
        ndoing++;
        $(this).find("span").text(ndoing);
      },
    });
    $("#donete").droppable({
      accept: ".green",
      drop: function () {
        ndonete++;
        $(this).find("span").text(ndonete);
      },
    });
  });
});
