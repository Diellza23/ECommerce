import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Admin from "./views/Admin.vue";
import Overview from "./views/Overview.vue";
import Products from "./views/Products.vue";
// import firebase from 'firebase/compat/app';
import Profile from "./views/Profile.vue";
import Orders from "./views/Orders.vue";
import About from "./views/About.vue";
import "./views/List.vue";
import { onAuthStateChanged, getAuth } from "firebase/auth";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,

  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/list",
      name: "list",
      meta: {
        isAuthenticated: true,
      },
      component: () => import(/*webpackChunkName: "list" */ "./views/List.vue"),
    },

    {
      path: "/admin",
      name: "admin",
      component: Admin,
      meta: { isAuthenticated: true },
      children: [
        {
          path: "overview",
          name: "overview",
          component: Overview,
        },
        {
          path: "products",
          name: "products",
          component: Products,
        },
        {
          path: "profile",
          name: "profile",
          component: Profile,
        },
        {
          path: "orders",
          name: "orders",
          component: Orders,
        },
      ],
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () => import("./views/Checkout.vue"),
    },
    {
      path: "/view/:id",
      name: "View",
      meta: {
        isAuthenticated: true,
      },
      component: () => import(/*webpackChunkName: "view" */ "./views/View.vue"),
    },
    {
      path: "/create",
      name: "Create",
      meta: {
        isAuthenticated: true,
      },
      component: () =>
        import(/*webpackChunkName: "create" */ "./views/Create.vue"),
    },
  ],
});

// router.beforeEach((to, from,next) => {
//     const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
//     const currentUser = firebase.auth().currentUser

//         if(requiresAuth && !currentUser) {
//             next('/')
//         }
//         else if(requiresAuth && currentUser)
//         {
//             next()
//         }
//         else{
//             next()
//         }
// })

router.beforeEach((to, from, next) => {
  onAuthStateChanged(getAuth(), async (user) => {
    if (to.matched.some((record) => record.meta.isAuthenticated && !user)) {
      next("/");
    } else if (to.matched.some((record) => record.meta.isAdmin)) {
      const tokenResult = getAuth().currentUser.getIdTokenResult();
      if (!tokenResult.claims.admin) {
        next("/admin");
      } else {
        next();
      }
    } else {
      next();
    }
  });
});

export default router;
