var indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;
let db;
let db2;
let email = document.getElementById("email");
let password = document.getElementById("password");
let envia_form = document.getElementById("envia_form");

function iniciarDB() {
  let LogOut = indexedDB.open("LogOut");
  LogOut.addEventListener("error", mostrarError);
  LogOut.addEventListener("success", comenzar);
  LogOut.addEventListener("upgradeneeded", crearAlmacen);

  //segundo acceso
  let sing_in = indexedDB.open("IvanDB");
  sing_in.addEventListener("error", mostrarError);
  sing_in.addEventListener("success", comenzarSingIn);

}
function mostrarError(error) {
  console.log("Hay un error en: " + error.code + " / " + error.message);
}
function comenzar(acceso) {
  db = acceso.target.result;
}
function comenzarSingIn(acceso) {
  db2 = acceso.target.result;
}
//Esto crea la estructura de la base de datos
function crearAlmacen(evento) {
  console.log(evento.target.result);
  let database = evento.target.result;
  //La tabla
  let almacen = database.createObjectStore("User", { keyPath: "Email" });
  //las fields
  // almacen.createIndex("Nombre", "Nombre", { unique: false });
  almacen.createIndex("Buscar_Nombre", "nombre", { unique: false });
}

envia_form.addEventListener("click", (e) => {
  let transaccion = db.transaction(["User"]);
  let almacen = transaccion.objectStore("User");
  let puntero = almacen.openCursor();
  console.log(puntero);
  if (
    puntero.value.Email == email.value &&
    puntero.value.Contrasena == password.value
  ) {
  }
});
