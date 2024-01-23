$(document).ready(function () {
  let colorClass;
  let ntooDo = 0;
  let ndoing = 0;
  let ndonete = 0;
  $("#genereitor").on("click", () => {
    let colorRand = Math.floor(Math.random() * (4 - 1) + 1);

    if (colorRand == 1) {
      colorClass = "red";
    } else if (colorRand == 2) {
      colorClass = "blue";
    } else if (colorRand == 3) {
      colorClass = "green";
    }
    $("#genereitor").after(`<div class='posit ${colorClass}'></div>`);
    if (
      $(".posit").data("droped") == true ||
      !$(".posit").data("droped") == undefined
    ) {
      $(".posit").data("droped", true);
    } else {
      $(".posit").data("droped", false);
    }
    console.log($(".posit").data("droped"));
    $(".posit").draggable();
  });
  $("#tooDo").droppable({
    accept: ".red",
    drop: function (event, e) {
      console.log($(e.draggable).data());
      if ($(e.draggable).data("droped") == false) {
        $(e.draggable).data("droped", true);
        ntooDo++;
      }
      console.log(ntooDo);
      $(this).find("span").text(ntooDo);
    },
  });
  $("#doing").droppable({
    accept: ".blue",
    drop: function (event, e) {
      if ($(e.draggable).data("droped") == false) {
        $(e.draggable).data("droped", true);
        ndoing++;
      }
      $(this).find("span").text(ndoing);
    },
  });
  $("#donete").droppable({
    accept: ".green",
    drop: function (event, e) {
      if ($(e.draggable).data("droped") == false) {
        $(e.draggable).data("droped", true);
        ndonete++;
      }
      $(this).find("span").text(ndonete);
    },
  });
  $("main").droppable({
    drop: function (event, e) {
      if ($(e.draggable).data("droped") == true) {
      }
    },
  });
});
