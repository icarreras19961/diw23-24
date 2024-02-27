import godbye from "./godbye.js";
import hello from "./hello.js";

const Home = { template: "<div>Home</div>" };

let router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/bye/:message", name: "godbye", component: godbye },
    { path: "/hello", name: "hello", component: hello },
  ],
});
export default router;
