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
let db2;
let offSesion = indexedDB.open("LogOut");
let solicitud = indexedDB.open("IvanDB");

function iniciarDB() {
  cajaUser = document.querySelector(".caja_users");
  console.log(solicitud);
  solicitud.addEventListener("error", mostrarError);
  solicitud.addEventListener("success", comenzar);
  // solicitud.addEventListener("upgradeneeded", crearAlmacen);

  offSesion.addEventListener("error", mostrarError);
  offSesion.addEventListener("success", comenzar);
  offSesion.addEventListener("upgradeneeded", crearAlmacen2);
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
    imagen_perfil.src = "./formulario/" + puntero.value.Avatar;
    imagen_perfil.style.borderRadius = "25px";
  }

  btn_s_out.addEventListener("click", (e) => {
    almacenarUser(puntero);
  });
}
function crearAlmacen(evento) {
  console.log("hpña" + evento.target.result);
  let database = evento.target.result;
  //La tabla
  let almacen = database.createObjectStore("User", { keyPath: "Email" });
  //las fields
  // almacen.createIndex("Nombre", "Nombre", { unique: false });
  almacen.createIndex("Buscar_Nombre", "nombre", { unique: false });
}
function crearAlmacen2(evento) {
  console.log("hpña" + evento.target.result);
  let database = evento.target.result;
  //La tabla
  let almacen = database.createObjectStore("User2", { keyPath: "Email" });
  //las fields
  // almacen.createIndex("Nombre", "Nombre", { unique: false });
  almacen.createIndex("Buscar_Nombre", "nombre", { unique: false });
}
function almacenarUser(puntero) {
  let transaccion = db.transaction(["User2"], "readwrite");
  let almacen = transaccion.objectStore("User2");

  let nombre = puntero.value.Nombre;
  let apellido = puntero.value.Apellido;
  let email = puntero.value.Email;
  let password = puntero.value.Contrasena;
  let img = puntero.value.Avatar;
  let admin = puntero.value.Admin;
  if (
    almacen.add({
      Nombre: nombre,
      Apellido: apellido,
      Email: email,
      Contrasena: password,
      Avatar: img,
      Admin: admin,
    })
  ) {
    console.log("patata");
  }
}
window.addEventListener("load", iniciarDB());
