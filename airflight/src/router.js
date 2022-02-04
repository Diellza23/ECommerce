import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Admin from "./views/Admin.vue";
import Overview from "./views/Overview.vue";
import Products from "./views/Products.vue";
import firebase from 'firebase/compat/app';
import Profile from './views/Profile.vue';
import Orders from './views/Orders.vue';
import About from './views/About.vue';
import List from './views/List.vue'

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path:"/" ,
            name: "home",
            component: Home
        },
        {
            path: "/about",
            name: "about",
            component: About
        },
        {
            path: "/list",
            name: "list",
            component: List
        },
        {
            path:"/admin",
            name: "admin",
            component: Admin, 
            meta: { requiresAuth: true},
            children:[
                {
                    path:"overview" ,
                    name: "overview",
                    component: Overview
                },
                {
                    path:"products" ,
                    name: "products",
                    component: Products
                },
                {
                    path:"profile" ,
                    name: "profile",
                    component: Profile
                },
                {
                    path:"orders" ,
                    name: "orders",
                    component: Orders
                }
            ]
        },
        
    ]
})

router.beforeEach((to, from,next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    const currentUser = firebase.auth().currentUser

        if(requiresAuth && !currentUser) {
            next('/')
        }
        else if(requiresAuth && currentUser)
        {
            next()
        }
        else{
            next()
        }
})

export default router;