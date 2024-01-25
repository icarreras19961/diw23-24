$(document).ready(function () {
  let colorClass;
  let ntooDo = 0;
  let ndoing = 0;
  let ndonete = 0;
  let contId = 0;
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
      `<div id='${contId}' class='posit ${colorClass}' style='left:${xRand}px; top:${yRand}px;'><button id="cerrar_posit_${contId}">X</button><button id="btnTA${contId}">»</button><h2>Post It</h2><textarea name="" id="" cols="30" rows="10"></textarea></div>`
    );
    $("#genereitor").after(postit);
    $("#cerrar_posit_" + contId).on("click", { contId: contId }, esconder);
    $("btnTA" + contId).on("click", { contId: contId }, hideTA);

    postit.data("droped", false);

    console.log($(".posit").data("droped"));
    // $(".posit").draggable();
    // postit.resizable({
    //   maxHeight: 250,
    //   maxWidth: 350,
    //   minHeight: 150,
    //   minWidth: 200
    // });

    postit.draggable();
    contId++;
    function esconder(event) {
      // console.log(event.data.contId);
      console.log($("#" + event.data.contId));
      // if ($("#" + event.data.contId).hasClass("red")) {}
      $("#" + event.data.contId).remove();
    }
    function hideTA(event) {
      $("#" + event.data.contId)
    }
  });
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

  // Que sean un posit
});
