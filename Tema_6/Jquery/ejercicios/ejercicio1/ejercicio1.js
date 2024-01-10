$(document).ready(function () {
  console.log("Loaded");
  $("#suma").on({
    click: function () {
      if ($.isNumeric($("#num2").val()) && $.isNumeric($("#num1").val())) {
        $("#resultado").text(
          parseInt($("#num2").val()) + parseInt($("#num1").val())
        );
      } else if (!$.isNumeric($("#num2").val())) {
        console.log("n2 no es un num");
      } else if (!$.isNumeric($("#num1").val())) {
        console.log("n1 no es un num");
      }
    },
  });
});
