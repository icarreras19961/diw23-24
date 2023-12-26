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
  let solicitud = indexedDB.open("IvanDB");
  solicitud.addEventListener("error", mostrarError);
  solicitud.addEventListener("success", comenzar);
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
}

//db2
function iniciarDB2() {
  //db2
  let solicitud2 = indexedDB.open("LogOut");
  solicitud2.addEventListener("error", mostrarError);
  solicitud2.addEventListener("success", comenzar2);
}
function comenzar2(acceso) {
  db2 = acceso.target.result;
  muestra2();
}
function muestra2() {
  let puntero = db2.transaction("User2").objectStore("User2").getAll();
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
  let users = evento.target.result;
  console.log(users);
  if (users.length != 0) {
    //Lo que se ve
    users.forEach((user) => {
      cajaUser.innerHTML += `<div class='col-lg-9 mx-auto p-3'><img class='avatar' src="../formulario/${user["Avatar"]}" width='50px' height='50px' style='border-radius: 55px;'>
      Nombre: ${user["Nombre"]} ${user["Apellido"]} / Email: ${user["Email"]}
      / Contraseña: ${user["Contrasena"]}
      <button class='btn gris chgPwd'>Cambiar Contraseña</button>
      <button class='btn gris' id='userDel'>Delete User</button>
      </div><button class='col-lg-2 h-50 mt-4 btn gris ajustes'>Ajustes</button> <hr>`;
    });
    let ajustes = document.querySelectorAll(".ajustes");
    let chgPwd = document.querySelectorAll(".chgPwd");

    for (let i = 0; i < users.length; i++) {
      ajustes[i].addEventListener("click", (e) => {
        e.preventDefault(); //para que no recargue la pagina
        // Lo que muestra los resultados de la base de datos en los inputs del popup
        envoltoriPopup[0].style.display = "block";
        //no llego a entender porque esto me sale como null si esta bien declarado hace literalmente 3 lineas arriba
        nombre.value = users[i].Nombre;
        Apellidos.value = users[i].Apellido;
        Email.value = users[i].Email;
        let img;
        imagen.addEventListener("click", (e) => {
          if (e.target.classList.contains("avatar")) {
            img = e.target.getAttribute("ruta");
            console.log(e.target.getAttribute("ruta"));
          }
        });
        enviaForm.addEventListener("click", (e) => {
          actualizarUser(
            nombre.value,
            Apellidos.value,
            Email.value,
            img,
            users[i].Contrasena
          );
        });
        cerrarPopup[0].addEventListener("click", (e) => {
          envoltoriPopup[0].style.display = "none";
        });

        function actualizarUser(nombre, apellido, email, img, pwd) {
          //se crea uno nuevo cada vez que pones un key distinto pero al punter.value.email ser undefined nose que hacer
          let transaccion = db2.transaction(["User2"], "readwrite");
          let almacen = transaccion.objectStore("User2");
          almacen.put({
            Nombre: nombre,
            Apellido: apellido,
            Email: email,
            Avatar: img,
            Contrasena: pwd,
          });

          //si el que esta registrado quiere cambiar cosas
          //   let transaccion2 = db.transaction(["User"], "readwrite");
          //   let almacen2 = transaccion2.objectStore("User");
          //   almacen2.put({
          //     Nombre: nombre,
          //     Apellido: apellido,
          //     Email: email,
          //     Avatar: img,
          //     Contrasena: pwd,
          //   });
          //   window.location.reload();
        }
        //el popup de la contraseña
      });

      chgPwd[i].addEventListener("click", (e) => {
        e.preventDefault();
        // pwd.value = puntero.value.contrasena;
        envoltoriPopupPwd[0].style.display = "block";
        enviaFormPwd.addEventListener("click", (e) => {
          // console.log(pwd.value+" "+pwd2.value);
          if (pwd.value == pwd2.value) {
            actualizarpwd(
              pwd,
              users[i].Nombre,
              users[i].Apellido,
              users[i].Email,
              users[i].Avatar
            );
          } else {
            console.log("hola");
            let errorPWD = document.getElementById("errorPWD");
            errorPWD.innerText = "Las contraseñas no coinciden";
            errorPWD.style.color = "red";
          }
        });
        function actualizarpwd(pwd, nombre, apellido, email, img) {
          let transaccion2 = db2.transaction(["User2"], "readwrite");
          let almacen = transaccion2.objectStore("User2");
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
    }
  }
  // let emailFijo;
  // if (puntero.length != 0) {
  //   emailFijo = puntero.value.Email;
  //   cajaUser.innerHTML +=
  //     "<div class='col-lg-9 mx-auto p-3'>" +
  //     "<img class='avatar' src=" +
  //     imagen_perfil.src +
  //     " width='50px' height='50px' style='border-radius: 55px;'> " +
  //     "Nombre: " +
  //     puntero.value.Nombre +
  //     " " +
  //     puntero.value.Apellido +
  //     " / Email: " +
  //     puntero.value.Email +
  //     " / Contraseña: " +
  //     puntero.value.Contrasena +
  //     " <button class='btn gris' id='chgPwd'>Cambiar Contraseña</button>" +
  //     " <button class='btn gris' id='userDel'>Delete User</button>" +
  //     `</div><button class='col-lg-2 h-50 mt-4 btn gris 'id='ajustes-${puntero.value.Email}'>Ajustes</button> <hr>`;

  //     //el popup de la contraseña
  //   password = document.getElementById("chgPwd");
  //   password.addEventListener("click", (e) => {
  //     e.preventDefault();
  //     console.log(puntero.value.Nombre);
  //     // pwd.value = puntero.value.contrasena;
  //     envoltoriPopupPwd[0].style.display = "block";
  //     enviaFormPwd.addEventListener("click", (e) => {
  //       // console.log(pwd.value+" "+pwd2.value);
  //       if (pwd.value == pwd2.value) {
  //         actualizarpwd(
  //           pwd,
  //           puntero.value.Nombre,
  //           puntero.value.Apellido,
  //           puntero.value.Email,
  //           puntero.value.Avatar
  //         );
  //       } else {
  //         console.log("hola");
  //         let errorPWD = document.getElementById("errorPWD");
  //         errorPWD.innerText = "Las contraseñas no coinciden";
  //         errorPWD.style.color = "red";
  //       }
  //     });
  //     function actualizarpwd(pwd, nombre, apellido, email, img) {
  //       let transaccion = db.transaction(["User"], "readwrite");
  //       let almacen = transaccion.objectStore("User");
  //       almacen.put({
  //         Nombre: nombre,
  //         Apellido: apellido,
  //         Email: email,
  //         Avatar: img,
  //         Contrasena: pwd,
  //       });
  //       window.location.reload();
  //     }
  //   });
  //   cerrarPopupPwd[0].addEventListener("click", (e) => {
  //     envoltoriPopupPwd[0].style.display = "none";
  //   });

  //   //el pop up de lo sajustes
  //   ajustes = document.getElementById("ajustes-" + puntero.value.Email);
  //   console.log(ajustes);
  //   ajustes.addEventListener("click", (e) => {
  //     console.log("hola");
  //     e.preventDefault(); //para que no recargue la pagina
  //     // Lo que muestra los resultados de la base de datos en los inputs del popup
  //     envoltoriPopup[0].style.display = "block";
  //     //no llego a entender porque esto me sale como null si esta bien declarado hace literalmente 3 lineas arriba
  //     nombre.value = puntero.value.Nombre;
  //     Apellidos.value = puntero.value.Apellido;
  //     Email.value = emailFijo;
  //     let img;
  //     imagen.addEventListener("click", (e) => {
  //       if (e.target.classList.contains("avatar")) {
  //         img = e.target.getAttribute("ruta");
  //         console.log(e.target.getAttribute("ruta"));
  //       }
  //     });
  //     enviaForm.addEventListener("click", (e) => {
  //       actualizarUser(nombre.value, Apellidos.value, emailFijo, img);
  //     });
  //     cerrarPopup[0].addEventListener("click", (e) => {
  //       envoltoriPopup[0].style.display = "none";
  //     });

  //     function actualizarUser(nombre, apellido, email, img, pwd) {
  //       //se crea uno nuevo cada vez que pones un key distinto pero al punter.value.email ser undefined nose que hacer
  //       let transaccion = db.transaction(["User"], "readwrite");
  //       let almacen = transaccion.objectStore("User");

  //       almacen.put({
  //         Nombre: nombre,
  //         Apellido: apellido,
  //         Email: email,
  //         Avatar: img,
  //         Contrasena: puntero.value.Contrasena,
  //       });
  //       window.location.reload();
  //     }
  //   });
  //   puntero.continue();
}

window.addEventListener("load", iniciarDB());
window.addEventListener("load", iniciarDB2());
