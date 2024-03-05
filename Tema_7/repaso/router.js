// Imports de los componentes
import creaUser from "./components/creaUser.js";
import formulario from "./components/formulario.js";

// Donde pondras las rutas
let router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    /**La ruta:
     *  path: es la ruta
     * component: es el componente que tiene que abrirse al utilizar la ruta
     */
    { path: "/", component: creaUser },
    { path: "/index.html", component: creaUser },
    { path: "/formulario", component: formulario },
  ],
});
export default router;
