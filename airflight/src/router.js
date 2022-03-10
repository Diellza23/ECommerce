import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Admin from "./views/Admin.vue";
import Overview from "./views/Overview.vue";
import Products from "./views/Products.vue";
import Profile from "./views/Profile.vue";
import About from "./views/About.vue";
import "./views/List.vue";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import List from "./views/List.vue";
import ContactsList from "./views/ContactsList.vue";
import CreateContact from "./views/CreateContact.vue";
import UsersList from "./components/users/UsersList.vue";
import OffersList from "./views/OffersList.vue";
import OffersDetails from "./views/OffersDetails.vue";
import UserProfile from "./views/UserProfile.vue";

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
      path: "/createContact",
      name: "createContact",
      component: CreateContact,
    },
    {
      path: "/offersList",
      name: "offersList",
      component: OffersList,
    },
    {
      path: "/offersDetails/:id",
      name: "offersDetails",
      component: OffersDetails,
    },
    {
      path: "/userProfile",
      name: "userProfile",
      meta: { isAuthenticated: true },
      component: UserProfile,
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
      meta: { isAuthenticated: true },
      children: [
        {
          path: "list",
          name: "list",
          component: List,
        },
        {
          path: "contactsList",
          name: "contactsList",
          component: ContactsList,
        },
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
          path: "view/:id",
          name: "View",
          component: () =>
            import(/*webpackChunkName: "view" */ "./views/View.vue"),
        },
        {
          path: "viewContact/:id",
          name: "ViewContact",
          component: () =>
            import(/*webpackChunkName: "view" */ "./views/ViewContact.vue"),
        },
        {
          path: "editOffer/:id",
          name: "EditOffer",
          component: () =>
            import(/*webpackChunkName: "view" */ "./views/EditOffer.vue"),
        },
        {
          path: "create",
          name: "Create",
          component: () =>
            import(/*webpackChunkName: "create" */ "./views/Create.vue"),
        },
        {
          path: "usersList",
          name: "UsersList",
          component: UsersList,
        },
      ],
    },

    {
      path: "/checkout",
      name: "checkout",
      component: () =>
        import(/*webpackChunkName: "view" */ "./views/Checkout.vue"),
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

// router.beforeEach((to, from, next) => {
//   onAuthStateChanged(getAuth(), async (user) => {
//     const shouldBeLoggedIn = (record) =>
//       record.meta.isAuthenticated || record.meta.isAdmin;

//     if (to.matched.some((record) => shouldBeLoggedIn(record))) {
//       if (!user) {
//         next("/");
//       } else {
//         const tokenResult = await getAuth().currentUser.getIdTokenResult();
//         const isAdmin = tokenResult.claims.admin;
//         if (isAdmin && to.matched.some((record) => !record.meta.isAdmin)) {
//           next("/admin");
//         } else if (to.matched.some((record) => record.meta.isAdmin)) {
//           if (!tokenResult.claims.admin) {
//             next("/about");
//           } else {
//             next();
//           }
//         } else {
//           next();
//         }
//       }
//     } else {
//       next();
//     }
//   });
// });

export default router;
