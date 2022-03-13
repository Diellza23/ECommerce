import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Admin from "./views/Admin.vue";
import Products from "./views/Products.vue";
import Profile from "./views/Profile.vue";
import About from "./views/About.vue";
import "./views/List.vue";
import { getAuth } from "firebase/auth";
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
      meta: { isAdmin: true },
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
            import(
              /*webpackChunkName: "viewContact" */ "./views/ViewContact.vue"
            ),
        },
        {
          path: "editOffer/:id",
          name: "EditOffer",
          component: () =>
            import(/*webpackChunkName: "editOffer" */ "./views/EditOffer.vue"),
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

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(
    (record) => record.meta.isAdmin || record.meta.isAuthenticated
  );
  const user = await getAuth().currentUser;

  if (requiresAuth && !user) {
    const tokenResult = await getAuth().currentUser.getIdTokenResult();
    const isUserAdmin = tokenResult.claims.admin;

    const isAdminRoute = to.matched.some((record) => record.meta.isAdmin);

    if (isUserAdmin && !isAdminRoute) {
      // redirect admin who tries to access user route
      next("/admin/list");
    } else if (!isUserAdmin && isAdminRoute) {
      // redirect user who attempts to access admin route
      next("/about");
    } else {
      next();
    }

    next("/");
  } else {
    next();
  }
});

export default router;
