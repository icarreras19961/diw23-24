import all_posts from "./components/all_posts.js";
import formulario from "./components/formulario.js";

let router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    // La barrita es lo que se vera justo entrar
    { path: "/",  component: all_posts },
    //A partir de la ruta se mostrara una cosa u otra
    { path: "/formulario", component: formulario },
    { path: "/formulario/:id",  component: formulario },
  ],
});
export default router
