export default {
  name: "post_header",
  template:`<header>
  <nav class="navbar">
    <div id="logo">
      <a href="./../index.html">
        <picture>
          <source media="(min-width:650px)" srcset="../logo_letras_claras/logohorizontal.png" />
          <source media="(min-width:300px)" srcset="../logo_letras_claras/minilogohorizontal.png" />
          <img src="../logo_letras_claras/logohorizontal.png" alt="" width="200px" />
        </picture>
      </a>
    </div>
    <div id="perfil">
      <img id="imagen_perfil" class="login_imagen" src="../iconos/perfilclaro.png" alt="" width="30" />
      <p>
        <a href="">
          <button id="btn_perfil" class="btn gris p-1">Perfil</button>
        </a>
        <button id="btn_s_out" class="btn gris p-1">Sign Out</button>
        <a href="../formulario/sign_in/sign_in.html">
          <button id="btn_s_in" class="btn gris p-1">Sign in</button>
        </a>
        <a href="../formulario/registro.html">
          <button class="btn gris p-1" id="botonRegistro">Register</button>
        </a>
      </p>
    </div>
  </nav>
</header>`
};