var indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;
let db;
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
//POP UP PWD
let envoltoriPopupPwd = document.getElementsByClassName("envoltorio-popup-pwd");

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
      puntero.value.password +
      " <button class='btn gris' id='chgPwd'>Cambiar Contraseña</button>" +
      "</div><button class='col-lg-2 h-50 mt-4 btn gris 'id='ajustes' class=''>Ajustes</button> <hr>";
    puntero.continue();

    password = document.getElementById("chgPwd");
    password.addEventListener("click", (e) => {
      console.log("hola");
      e.preventDefault();
      envoltoriPopupPwd[0].style.display = "block";
    });

    ajustes = document.getElementById("ajustes");
    ajustes.addEventListener("click", (e) => {
      e.preventDefault(); //para que no recargue la pagina
      // Lo que muestra los resultados de la base de datos en los inputs del popup
      nombre.value = puntero.value.Nombre;
      Apellidos.value = puntero.value.Apellido;
      Email.value = puntero.value.Email;
      envoltoriPopup[0].style.display = "block";
      let img;
      imagen.addEventListener("click", (e) => {
        if (e.target.classList.contains("avatar")) {
          img = e.target.getAttribute("ruta");
          console.log(e.target.getAttribute("ruta"));
        }
      });
      enviaForm.addEventListener("click", (e) => {
        puntero.value.nombre = nombre.value;
        puntero.value.Apellido = Apellidos.value;
        puntero.value.Email = Email.value;
        puntero.value.Avatar = img;
        actualizarUser(
          puntero.value.nombre,
          puntero.value.Apellido,
          puntero.value.Email,
          puntero.value.Avatar
        );
      });
      cerrarPopup[0].addEventListener("click", (e) => {
        envoltoriPopup[0].style.display = "none";
      });
      function actualizarUser(nombre, apellido, email, img) {
        let transaccion = db.transaction(["User"], "readwrite");
        let almacen = transaccion.objectStore("User");

        almacen.put({
          Nombre: nombre,
          Apellido: apellido,
          Email: email,
          Avatar: img,
        });
        window.location.reload();
      }
    });
  }
}

window.addEventListener("load", iniciarDB());
