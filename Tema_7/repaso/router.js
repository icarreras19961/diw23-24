import formulario from "./components/formulario.js";

let router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [{ path: "/", component: formulario }],
});
export default router;
