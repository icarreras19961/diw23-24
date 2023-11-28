var indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;
let db;
let cajaUser;
const form = document.getElementById("form");
const email = document.getElementById("email");
let imagen = document.getElementById("imagen");
console.log(imagen);
//crea la base de datos o la abre si esta creada.
function iniciarDB() {
  cajaUser = document.querySelector(".caja_users");
  let btnGuardar = document.querySelector("#envia_form");
  console.log(btnGuardar);
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
  muestra();
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
imagen.addEventListener((e) => {
  console.log(e.target);
});
function almacenarUser(e) {
  e.preventDefault();
  let nombre = document.querySelector("#nombre").value;
  console.log(nombre);

  let apellido = document.querySelector("#apellido").value;
  console.log(document.querySelector("#apellido").value);

  let email = document.querySelector("#email").value;
  console.log(document.querySelector("#email").value);

  let password = document.querySelector("#password").value;
  console.log(document.querySelector("#password").value);

  let transaccion = db.transaction(["User"], "readwrite");
  let almacen = transaccion.objectStore("User");
  transaccion.addEventListener("complete", mostrarUser);

  almacen.add({
    Nombre: nombre,
    Apellido: apellido,
    Email: email,
    Contrasena: password,
    Avatar: avatar,
  });

  document.querySelector("#nombre").value = "";
  document.querySelector("#apellido").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#telefono").value = "";
}

function muestra() {
  cajaUser.innerHTML = "";

  let transaccion = db.transaction(["User"]);
  let almacen = transaccion.objectStore("User");
  let puntero = almacen.openCursor();
  console.log(puntero);
  puntero.addEventListener("success", mostrarUser);
}

function mostrarUser(evento) {
  console.log(evento);
  let puntero = evento.target.result;
  if (puntero) {
    cajaUser.innerHTML +=
      "<div>" +
      "Nombre: " +
      puntero.value.Nombre +
      " " +
      puntero.value.Apellido +
      " / Email: " +
      puntero.value.Email +
      " / Contraseña: " +
      puntero.value.password +
      "</div>";
    puntero.continue();
  }
}

/*Lo de validar el mail no va*/
// form.addEventListener("submit", (e) => {
//   esEmailValid(email);
// });
// function esEmailValid(input) {
//   const re =
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//   if (re.test(input.value.trim())) {
//     mostraCorrecte(input);
//   } else {
//     let mensaje = prenNomInput(input) + " no tiene el formato correcto";
//     mostraError(input, mensaje);
//   }
// }
// function mostraError(input, mensaje) {
//   const formControl = input.parentElement;
//   formControl.className = "form-control error";
//   const label = formControl.querySelector("label");
//   const small = formControl.querySelector("small");
//   small.innerText = mensaje;
// }
window.addEventListener("load", iniciarDB());
