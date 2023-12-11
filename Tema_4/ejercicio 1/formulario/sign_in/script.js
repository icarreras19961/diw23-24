var indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;
let db;
let email = document.getElementById("email");
let password = document.getElementById("password");
let envia_form = document.getElementById("envia_form");

function iniciarDB() {
  let LogOut = indexedDB.open("LogOut");
  LogOut.addEventListener("error", mostrarError);
  LogOut.addEventListener("success", comenzar);
  LogOut.addEventListener("upgradeneeded", crearAlmacen);
}
function mostrarError(error) {
  console.log("Hay un error en: " + error.code + " / " + error.message);
}
function comenzar(acceso) {
  db = acceso.target.result;
}
//Esto crea la estructura de la base de datos
function crearAlmacen(evento) {
  console.log(evento.target.result);
  let database = evento.target.result;
  //La tabla
  let almacen = database.createObjectStore("User2", { keyPath: "Email" });
  //las fields
  // almacen.createIndex("Nombre", "Nombre", { unique: false });
  almacen.createIndex("Buscar_Nombre", "nombre", { unique: false });
}
envia_form.addEventListener("click", (e) => {
  let transaccion = db.transaction(["User2"]);
  let almacen = transaccion.objectStore("User2");
  let puntero = almacen.openCursor();
  puntero.addEventListener("success", mostrarUser);
});
function mostrarUser(evento) {
  console.log(evento);
  let puntero = evento.target.result;
  console.log(puntero.value.Email);
  console.log(puntero.value.Contrasena);

  if (
    puntero.value.Email == email.value &&
    puntero.value.Contrasena == password.value
  ) {
    vaciarLogOut();
    almacenarUser(puntero.value.Nombre,
      puntero.value.Apellido,
      puntero.value.Email,
      puntero.value.Contrasena,
      puntero.value.Avatar,
      puntero.value.Admin);
    window.location.href = "../../index.html";

  } else {
    console.log("boniato");
  }
  if (puntero != null) {
    puntero.continue();
  }
}
function vaciarLogOut() {
  console.log(db);
  let transaccion = db.transaction(["User2"], "readwrite");
  let almacen = transaccion.objectStore("User2");
  almacen.clear();
}
//La bes de datos 2
let db2;
function iniciarDB2() {
  //segundo acceso
  let sing_in = indexedDB.open("IvanDB");
  sing_in.addEventListener("error", mostrarError);
  sing_in.addEventListener("success", comenzarSingIn);
  sing_in.addEventListener("upgradeneeded", crearAlmacen2);
}
function comenzarSingIn(acceso) {
  db2 = acceso.target.result;
}
function crearAlmacen2(evento) {
  console.log(evento.target.result);
  let database = evento.target.result;
  //La tabla
  let almacen = database.createObjectStore("User", { keyPath: "Email" });
  //las fields
  almacen.createIndex("Buscar_Nombre", "nombre", { unique: false });
}
function almacenarUser(nombre, apellido, email, password, img, admin) {
  // console.log("patata" + puntero);
  let transaccion = db2.transaction(["User"], "readwrite");
  let almacen = transaccion.objectStore("User");

  almacen.add({
    Nombre: nombre,
    Apellido: apellido,
    Email: email,
    Contrasena: password,
    Avatar: img,
    Admin: admin,
  });
}
window.addEventListener("load", iniciarDB());
window.addEventListener("load", iniciarDB2());
