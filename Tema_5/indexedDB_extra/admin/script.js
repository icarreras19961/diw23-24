var indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;
let db;
let db2;
let ajustes;
let password;
let cajaUser;

//variables popup
let envoltoriPopup = document.getElementsByClassName("envoltorio-popup");
let cerrarPopup = document.getElementsByClassName("cerrar-popup");
//Variables de indexdb que iran dentro del popup
let nombre = document.getElementById("nombre");
let Apellidos = document.getElementById("apellido");
let Email = document.getElementById("email");
let imagen = document.getElementById("imagen");
let enviaForm = document.getElementById("envia_form");
let pwd = document.getElementById("password");
let pwd2 = document.getElementById("password2");

//POP UP PWD
let envoltoriPopupPwd = document.getElementsByClassName("envoltorio-popup-pwd");
let cerrarPopupPwd = document.getElementsByClassName("cerrar-popup-pwd");
let enviaFormPwd = document.getElementById("envia-form-pwd");

function iniciarDB() {
  cajaUser = document.querySelector("#cajaUser");
  //db 1
  let solicitud = indexedDB.open("LogOut");
  solicitud.addEventListener("error", mostrarError);
  solicitud.addEventListener("success", comenzar);

  //db2

}
function mostrarError(error) {
  console.log("Hay un error en: " + error.code + " / " + error.message);
}
//db1
function comenzar(acceso) {
  db = acceso.target.result;
  muestra();
}
function muestra() {
  let transaccion = db.transaction(["User"]);
  let almacen = transaccion.objectStore("User");
  let puntero = almacen.openCursor();
  console.log("puntero " + puntero);
  puntero.addEventListener("success", userLoged);
  puntero.addEventListener("success", mostrarUser);
}
//db2
function comenzar2(acceso) {
  db2 = acceso.target.result;
  muestra2();
}
function muestra2() {
  let transaccion = db2.transaction(["User2"]);
  let almacen = transaccion.objectStore("User2");
  let puntero = almacen.openCursor();
  puntero.addEventListener("success", mostrarUser);
}
//solo se mira el usuario registrado
function userLoged(evento) {
  let puntero = evento.target.result;
  if (puntero.value.Admin == false) {
    window.location.href = "../index.html";
  }
  btn_perfil.style.display = "inline-block";
  btn_s_out.style.display = "inline-block";
  btn_s_in.style.display = "none";
  botonRegistro.style.display = "none";
  imagen_perfil.src = "../formulario/" + puntero.value.Avatar;
  imagen_perfil.style.borderRadius = "25px";
}
function mostrarUser(evento) {
  let puntero = evento.target.result;
  let emailFijo;
  if (puntero != null) {
    emailFijo = puntero.value.Email;
    cajaUser.innerHTML +=
      "<div class='col-lg-9 mx-auto p-3'>" +
      "<img class='avatar' src=" +
      imagen_perfil.src +
      " width='50px' height='50px' style='border-radius: 55px;'> " +
      "Nombre: " +
      puntero.value.Nombre +
      " " +
      puntero.value.Apellido +
      " / Email: " +
      puntero.value.Email +
      " / Contraseña: " +
      puntero.value.Contrasena +
      " <button class='btn gris' id='chgPwd'>Cambiar Contraseña</button>" +
      " <button class='btn gris' id='userDel'>Delete User</button>" +
      "</div><button class='col-lg-2 h-50 mt-4 btn gris 'id='ajustes' class=''>Ajustes</button> <hr>";
    puntero.continue();

    password = document.getElementById("chgPwd");
    password.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(puntero.value.Nombre);
      // pwd.value = puntero.value.contrasena;
      envoltoriPopupPwd[0].style.display = "block";
      enviaFormPwd.addEventListener("click", (e) => {
        // console.log(pwd.value+" "+pwd2.value);
        if (pwd.value == pwd2.value) {
          actualizarpwd(
            pwd,
            puntero.value.Nombre,
            puntero.value.Apellido,
            puntero.value.Email,
            puntero.value.Avatar
          );
        } else {
          console.log("hola");
          let errorPWD = document.getElementById("errorPWD");
          errorPWD.innerText = "Las contraseñas no coinciden";
          errorPWD.style.color = "red";
        }
      });
      function actualizarpwd(pwd, nombre, apellido, email, img) {
        let transaccion = db.transaction(["User"], "readwrite");
        let almacen = transaccion.objectStore("User");
        almacen.put({
          Nombre: nombre,
          Apellido: apellido,
          Email: email,
          Avatar: img,
          Contrasena: pwd,
        });
        window.location.reload();
      }
    });
    cerrarPopupPwd[0].addEventListener("click", (e) => {
      envoltoriPopupPwd[0].style.display = "none";
    });

    ajustes = document.getElementById("ajustes");
    ajustes.addEventListener("click", (e) => {
      e.preventDefault(); //para que no recargue la pagina
      // Lo que muestra los resultados de la base de datos en los inputs del popup
      envoltoriPopup[0].style.display = "block";
      //no llego a entender porque esto me sale como null si esta bien declarado hace literalmente 3 lineas arriba
      nombre.value = puntero.value.Nombre;
      Apellidos.value = puntero.value.Apellido;
      Email.value = emailFijo;
      let img;
      imagen.addEventListener("click", (e) => {
        if (e.target.classList.contains("avatar")) {
          img = e.target.getAttribute("ruta");
          console.log(e.target.getAttribute("ruta"));
        }
      });
      enviaForm.addEventListener("click", (e) => {
        actualizarUser(nombre.value, Apellidos.value, emailFijo, img);
      });
      cerrarPopup[0].addEventListener("click", (e) => {
        envoltoriPopup[0].style.display = "none";
      });
      function actualizarUser(nombre, apellido, email, img, pwd) {
        //se crea uno nuevo cada vez que pones un key distinto pero al punter.value.email ser undefined nose que hacer
        let transaccion = db.transaction(["User"], "readwrite");
        let almacen = transaccion.objectStore("User");

        almacen.put({
          Nombre: nombre,
          Apellido: apellido,
          Email: email,
          Avatar: img,
          Contrasena: puntero.value.Contrasena,
        });
        window.location.reload();
      }
    });
  }
}

window.addEventListener("load", iniciarDB());
