<template>
  <div class="hello">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Shop</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link" aria-current="page"
                >Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">About</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/createContact" class="nav-link"
                >Contact Us</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/offersList" class="nav-link"
                >Offers</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/checkout" class="nav-link"
                >Checkout</router-link
              >
            </li>
          </ul>

          <form class="form-inline my-2 my-lg-0">
            <a
              style="color: white"
              v-if="!email"
              class="btn btn-info"
              data-bs-toggle="modal"
              data-bs-target="#login"
              >Login/Register</a
            >
            <a
              class="btn btn-outline-info border-0 mx-2 my-2 my-sm-0"
              data-bs-toggle="modal"
              data-bs-target="#miniCart"
            >
              <i class="fas fa-cart-plus"></i>
            </a>
          </form>
          <!-- </div> -->

          <div class="btn-group" v-if="email">
            <button
              type="button"
              class="btn btn-info dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style="border-radius: 5px; color: white"
            >
              <img
                class="rounded-circle dropdown-bs-toggle"
                src="../../public/img/simpleuser.png"
                style="width: 35px; height: 30px"
                alt="user-avatar"
              />

              {{ email }}
            </button>

            <div class="dropdown-menu dropdown-menu-right">
              <button class="dropdown-item" type="button">Profile</button>
              <button class="dropdown-item" type="button">
                Another action
              </button>
              <button class="dropdown-item" type="button" @click="logout()">
                <i class="fa fa-power-off" style="padding-right: 10px"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default {
  name: "Navbar",
  props: {
    msg: String,
  },
  data() {
    return {
      name: null,
      email: null,
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("/");
        })
        .catch((err) => {
          alert(err.message);
        });
    },
  },

  created() {
    var user = firebase.auth().currentUser;
    this.email = user.email;
  },
};
</script>

<style scoped lang="scss"></style>
