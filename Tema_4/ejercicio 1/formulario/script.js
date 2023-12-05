var indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;
let db;
let cajaUser;
let validadoOK;
const form = document.getElementById("form");
const email = document.getElementById("email");
let imagen = document.getElementById("imagen");

//crea la base de datos o la abre si esta creada.
function iniciarDB() {
  cajaUser = document.querySelector(".caja_users");
  let btnGuardar = document.querySelector("#envia_form");
  // console.log(btnGuardar);
  btnGuardar.addEventListener("click", (e) => {
    validador();
    if (validadoOK) {
      almacenarUser();
    }else{
      console.log("algo esta mal escrito");
    }
  });

  let solicitud = indexedDB.open("IvanDB");

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

let img;
imagen.addEventListener("click", (e) => {
  if (e.target.classList.contains("avatar")) {
    img = e.target.getAttribute("ruta");
    console.log(e.target.getAttribute("ruta"));
  }
});
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

function almacenarUser(e) {
  
  let nombre = document.querySelector("#nombre").value;
  console.log(nombre);

  let apellido = document.querySelector("#apellido").value;
  console.log(document.querySelector("#apellido").value);

  let email = document.querySelector("#email").value;
  console.log(document.querySelector("#email").value);

  let password = document.querySelector("#password").value;
  console.log(document.querySelector("#password").value);

  let admin = document.querySelector("#admin").checked;
  console.log(document.querySelector("#admin").checked);

  let transaccion = db.transaction(["User"], "readwrite");
  let almacen = transaccion.objectStore("User");
  transaccion.addEventListener("complete", mostrarUser);

  almacen.add({
    Nombre: nombre,
    Apellido: apellido,
    Email: email,
    Contrasena: password,
    Avatar: img,
    Admin: admin,
  });

  document.querySelector("#nombre").value = "";
  document.querySelector("#apellido").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#password").value = "";
  // document.querySelector("#password").value = "";
  document.querySelector("#admin").value = "";

  window.location.href = "./../index.html";
}

function muestra() {
  cajaUser.innerHTML = "";
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
//Los validadores 100% originales que para nada estan copiados de un ejercicio de Joan
function validador() {
  let obligatorio = [
    document.querySelector("#nombre"),
    document.querySelector("#apellido"),
    email,
    document.querySelector("#password"),
  ];
  console.log(obligatorio);
  comprobaLognitud(document.querySelector("#nombre"), 3, 15);
  comprobaLognitud(document.querySelector("#password"), 6, 25);
  comprobaLognitud(document.querySelector("#password2"), 6, 25);
  esObligatorio(obligatorio);

  esEmailValid(email);
  comprovaContrasenasSonIguales(
    document.querySelector("#password"),
    document.querySelector("#password2")
  );
  validadoOK = true;
}

//Validador de que sea obligatorio llenar el campo
function esObligatorio(inputArray) {
  inputArray.forEach((input) => {
    if (input.value === "") {
      mostraError(input, `${prenNomInput(input)} es obligatorio`);
    } else {
      mostraCorrecte(input);
    }
  });
}
function prenNomInput(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
function mostraCorrecte(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control correcte";
}
//Ver si el email esta bien escrito
function esEmailValid(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {
    mostraCorrecte(input);
  } else {
    let mensaje = prenNomInput(input) + " no tiene el formato correcto";
    mostraError(input, mensaje);
  }
}
//Muestra el error por el formulario
function mostraError(input, mensaje) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const label = formControl.querySelector("label");
  const small = formControl.querySelector("small");
  small.innerText = mensaje;
}
//Comprueba la longitud de las palabras
function comprobaLognitud(input, min, max) {
  if (input.value.length < min) {
    mostraError(input, "Ha de tener un minimo de: " + min + " caracteres");
  } else if (input.value.length > max) {
    mostraError(input, "Ha de tener un maximo de: " + max + " caracteres");
  } else {
    mostraCorrecte(input);
  }
}
//Comprueva que las contraseñas sean iguales
function comprovaContrasenasSonIguales(input1, input2) {
  if (input1.value != input2.value) {
    let mensaje =
      prenNomInput(input2) + " ha de ser igual a " + prenNomInput(input1);
    mostraError(input2, mensaje);
  }
}
window.addEventListener("load", iniciarDB());
