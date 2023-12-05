var indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;
let db;
let ajustes;
let cajaUser;
function iniciarDB() {
  cajaUser = document.querySelector("#cajaUser");
  console.log(cajaUser);
  let btnGuardar = document.querySelector("#envia_form");

  let solicitud = indexedDB.open("IvanDB");
  console.log(solicitud);
  solicitud.addEventListener("error", mostrarError);
  solicitud.addEventListener("success", comenzar);
}
function mostrarError(error) {
  console.log("Hay un error en: " + error.code + " / " + error.message);
}
function comenzar(acceso) {
  db = acceso.target.result;
  muestra();
}
function muestra() {
  console.log("la variable db: " + db);

  let transaccion = db.transaction(["User"]);
  let almacen = transaccion.objectStore("User");
  let puntero = almacen.openCursor();
  console.log(puntero);
  puntero.addEventListener("success", mostrarUser);
}
function mostrarUser(evento) {
  console.log(evento);
  let puntero = evento.target.result;
  if (puntero != null) {
    btn_perfil.style.display = "inline-block";
    btn_s_out.style.display = "inline-block";
    btn_s_in.style.display = "none";
    botonRegistro.style.display = "none";
    imagen_perfil.src = "../formulario/" + puntero.value.Avatar;
    imagen_perfil.style.borderRadius = "25px";

    cajaUser.innerHTML +=
      "<div class='col-lg-9 mx-auto p-3'>" +
      "Nombre: " +
      puntero.value.Nombre +
      " " +
      puntero.value.Apellido +
      " / Email: " +
      puntero.value.Email +
      " / Contraseña: " +
      puntero.value.password +
      "</div><a href='' class='col-lg-2'><button id='ajustes' class='btn gris'>Ajustes</button></a> <hr>";
    puntero.continue();
    ajustes = document.getElementById("ajustes");
    ajustes.addEventListener("click", (e) => {
      console.log("hola");
    });
  }
}

window.addEventListener("load", iniciarDB());
