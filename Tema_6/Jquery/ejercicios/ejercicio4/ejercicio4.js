$(document).ready(function () {
  // Variables that im going to use 
  let colorClass;
  let ntooDo = 0;
  let ndoing = 0;
  let ndonete = 0;
  let contId = 0;
  const envoltorio = $(".envoltorio-popup");

  // The button that generates the posits
  $("#genereitor").on("click", () => {
    let colorRand = Math.floor(Math.random() * (4 - 1) + 1);
    let xRand = Math.floor(Math.random() * (400 - 1) + 1);
    let yRand = Math.floor(Math.random() * (400 - 1) + 1);

    if (colorRand == 1) {
      colorClass = "red";
    } else if (colorRand == 2) {
      colorClass = "blue";
    } else if (colorRand == 3) {
      colorClass = "green";
    }

    let postit = $(
      `<div id='${contId}' class='posit ${colorClass}' style='left:${xRand}px; top:${yRand}px;'><button id="cerrar_posit_${contId}">X</button><h2>Post It</h2><textarea name="" id="" cols="30" rows="10"></textarea></div>`
    );
    $("#genereitor").after(postit);
    $("#cerrar_posit_" + contId).on("click", { contId: contId }, esconder);
    postit.data("droped", false);

    console.log($(".posit").data("droped"));

    postit.draggable();
    contId++;
    // The function that deletes the posit
    function esconder(event) {
      envoltorio[0].style.display = "block";
      $("#yes").on("click", () => {
        console.log("hola");
        if (
          $("#" +  event.data.contId).hasClass("red") &&
          $("#" +  event.data.contId).data("droped") == true
        ) {
          ntooDo--;
          $("#tooDo").find("span").text(ntooDo);
        } else if (
          $("#" + event.data.contId).hasClass("blue") &&
          $("#" + event.data.contId).data("droped") == true
        ) {
          ndoing--;
          $("#doing").find("span").text(ndoing);
        } else if (
          $("#" + event.data.contId).hasClass("green") &&
          $("#" + event.data.contId).data("droped") == true
        ) {
          ndonete--;
          $("#donete").find("span").text(ndonete);
        }

        envoltorio[0].style.display = "none";
        $("#" + event.data.contId).remove();
      });

      $(".cerrar-popup").on("click", () => {
        envoltorio[0].style.display = "none";
      });
      $(".cerrar-popup").on("click", () => {
        envoltorio[0].style.display = "none";
      });
      $("#no").on("click", () => {
        envoltorio[0].style.display = "none";
      });
    }
  });

  // The event listeners that listen when something its droped in each one of them
  $("#tooDo").droppable({
    accept: ".red",
    drop: function (event, e) {
      // console.log($(e));
      if ($(e.draggable).data("droped") == false) {
        $(e.draggable).data("droped", true);
        ntooDo++;
      }
      // console.log(ntooDo);
      $(this).find("span").text(ntooDo);
    },
    out: function (event, e) {
      // console.log($(e));
      if ($(e.draggable).data("droped") == true) {
        $(e.draggable).data("droped", false);
        ntooDo--;
      }
      // console.log(ntooDo);
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
    out: function (event, e) {
      // console.log($(e));
      if ($(e.draggable).data("droped") == true) {
        $(e.draggable).data("droped", false);
        ndoing--;
      }
      // console.log(ntooDo);
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
    out: function (event, e) {
      // console.log($(e));
      if ($(e.draggable).data("droped") == true) {
        $(e.draggable).data("droped", false);
        ndonete--;
      }
      // console.log(ntooDo);
      $(this).find("span").text(ndonete);
    },
  });
});
