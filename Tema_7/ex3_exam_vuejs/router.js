import Login from "./components/Login.js";
import User from "./components/User.js";

let router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    { path: "/", component: Login },
    { path: "/index.html", component: Login },
    { path: "/user", component: User },
  ],
});

export default router;
