var indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;
let imagen_perfil = document.getElementById("imagen_perfil");
let btn_perfil = document.getElementById("btn_perfil");
let btn_s_out = document.getElementById("btn_s_out");
let btn_s_in = document.getElementById("btn_s_in");
let botonRegistro = document.getElementById("botonRegistro");

let db;
function iniciarDB() {
  cajaUser = document.querySelector(".caja_users");
  let btnGuardar = document.querySelector("#envia_form");
  // console.log(btnGuardar);
  // btnGuardar.addEventListener("click", almacenarUser);

  let solicitud = indexedDB.open("IvanDB");
  console.log(solicitud);
  solicitud.addEventListener("error", mostrarError);
  solicitud.addEventListener("success", comenzar);
  // solicitud.addEventListener("upgradeneeded", crearAlmacen);
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
  // console.log(puntero);
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
    imagen_perfil.src = "./formulario/"+puntero.value.Avatar;
    imagen_perfil.style.borderRadius = "25px";
  }
}
window.addEventListener("load", iniciarDB());
