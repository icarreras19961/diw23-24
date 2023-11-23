var indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;
let db;

//crea la base de datos o la abre si esta creada.
function iniciarDB() {
  let btnGuardar = document.querySelector("submit");
  btnGuardar.addEventListener("click", almacenarUser);

  let solicitud = indexedDB.open("Datos-de-formulario");

  solicitud.addEventListener("error", mostrarError);
  solicitud.addEventListener("success", comenzar);
  solicitud.addEventListener("upgradeneeded", crearAlmacen);
}

//En caso de que falle la peticio
function mostrarError(error) {
  console.log("Hay un error en: " + error.code + " / " + error.message);
}
//en caso de que se arranque correctamente
function comenzar(acceso) {
  db = acceso.target.result;
  console.log(db);
}

//Esto crea la estructura de la base de datos
function crearAlmacen(evento) {
  console.log(evento.target.result);
  let database = evento.target.result;
  //La tabla
  let almacen = database.createObjectStore("User", { keyPath: "nombre" });
  //las fields
  // almacen.createIndex("Nombre", "Nombre", { unique: false });
  almacen.createIndex("Apellido", "Apellido", { unique: false });
  almacen.createIndex("Email", "Email", { unique: false });
  almacen.createIndex("Telefono", "Telefono", { unique: false });
  almacen.createIndex("Avatar", "Avatar", { unique: false });
}

function almacenarUser() {
  let nombre = document.querySelector("#nombre").value;
  let apellido = document.querySelector("#apellido").value;
  let email = document.querySelector("#email").value;
  let telefono = document.querySelector("#telefono").value;

  let transaccion = db.transaction(["User"], "readwrite");
  let almacen = transaccion.objectStore("User");

  almacen.add({
    Nombre: nombre,
    Apellido: apellido,
    Email: email,
    Telefono: telefono,
  });
}
window.addEventListener("load", iniciarDB());
