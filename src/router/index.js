// Composables
import { createRouter, createWebHistory } from "vue-router";
import { createApp } from "vue";
import App from "../App.vue";

const ShowFoodAdvance = () => import("../components/ShowFoodAdvance.vue");
const FoodLayout = () => import("../components/FoodLayout.vue");

const app = createApp(App);
var baseUrl = "";

baseUrl = "https://api.spoonacular.com/recipes";

const api = baseUrl;
app.mixin({
  data() {
    return {
      API: api,
    };
  },
});

// const routes = [
//   {
//     path: "/",
//     children: [
//       {
//         path: "",
//         components: {
//           default: FoodLayout,
//         },
//       },
//       {
//         path: "advance-search",
//         components: {
//           default: ShowFoodAdvance,
//         },
//       },
//     ],
//   },
//   // {
//   //   path: "/advance-search",
//   //   children: [
//   //     {
//   //       path: "",
//   //       name: "Search",
//   //       component: {
//   //         showFood: ShowFoodAdvance,
//   //       },
//   //       // () =>
//   //       //   import(
//   //       //     /* webpackChunkName: "home" */ "@/components/ShowFoodAdvance.vue"
//   //       //   ),
//   //     },
//   //   ],
//   // },
// ];

const router = createRouter({
  // ...
  history: createWebHistory(process.env.BASE_URL),

  routes: [
    { path: "/", component: FoodLayout },
    { path: "/advance-search", component: ShowFoodAdvance },
  ],
});

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
// });

export default router;

/////////////////////////////////////
///
// import Vue from "vue";
// import Router from "vue-router";

// import FoodLayout from "../components/FoodLayout";

// Vue.use(Router);
// var baseUrl = "";

// baseUrl = "https://api.spoonacular.com/recipes";

// const api = baseUrl;
// Vue.mixin({
//   data() {
//     return {
//       API: api,
//     };
//   },
// });

// let routeArr = [];
// routeArr.push({
//   name: "Dashboard",
//   icon: "",
//   path: "/",
//   component: FoodLayout,
//   props: {
//     api: api,
//   },
// });

// let admRoute = new Router({
//   routes: routeArr,
// });

// export default admRoute;
