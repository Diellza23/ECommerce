<template>
  <section class="container">
    <div class="ui middle aligned center aligned grid">
      <div class="column">
        <h1>Manage Users</h1>
        <p v-if="user" class="form-control">You: {{ user.email }}</p>
        <form class="form-inline my-2 my-lg-0">
          <button
            @click="addNew()"
            class="btn btn-outline-success"
            style="float: left; margin-bottom: 20px; margin-top: 20px"
            type="button"
          >
            Add New User
          </button>
        </form>

        <table class="ui celled table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Operations</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td data-label="Name">{{ user.email }}</td>
              <td>
                <button class="btn btn-danger">Delete User</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      class="modal fade"
      id="modaalRegister"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document" style="width: 500px">
        <div class="modal-content">
          <div class="modal-body">
            <div class="row">
              <h5 class="text-center" style="margin-top: 15px">
                Create a User Account
              </h5>

              <div
                class="form-group"
                style="margin-bottom: 20px; margin-top: 20px"
              >
                <input
                  type="text"
                  v-model="name"
                  class="form-control"
                  id="name"
                  placeholder="Username"
                  style="margin-left: 15px; width: 90%"
                />
              </div>

              <div
                class="form-group"
                style="margin-bottom: 20px; margin-top: 20px"
              >
                <input
                  type="email"
                  v-model="email"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  style="margin-left: 15px; width: 90%"
                />
              </div>
              <div
                class="form-group"
                style="margin-bottom: 20px; margin-top: 20px"
              >
                <input
                  type="password"
                  @keyup.enter="addUser"
                  v-model="password"
                  class="form-control"
                  id="password"
                  placeholder="Password"
                  style="margin-left: 15px; width: 90%"
                />
              </div>

              <div class="modal-footer" style="margin-top: 25px">
                <button
                  class="btn btn-outline-success"
                  style="font-family: sans-serif"
                  @click="addUser"
                >
                  Create
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import firebase from "firebase/compat";
import "firebase/compat/auth";
import $ from "jquery";
import apiCaller from "@/utility/apiRequest/apiCaller";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      users: [],
      user: null,
      name: "",
      email: "",
      password: "",
    };
  },
  created() {
    var self = this;
    firebase.auth().onAuthStateChanged(function (user) {
      self.user = user;
    });
    this.users = [];
    firebase
      .firestore()
      .collection("roles")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          var user = doc.data();
          user.id = doc.id;
          console.log(doc.data());
          if (!user.role.admin) this.users.push(user);
        });
      });
  },
  methods: {
    signout() {
      firebase
        .auth()
        .signOut()
        .then((user) => {
          this.$router.push("/");
          console.log(user);
        });
    },
    addNew() {
      this.modal = "new";

      // this.reset();

      $("#modaalRegister").modal("show");
    },

    changeRole(uid, event) {
      var addMessage = firebase.functions().httpsCallable("setUserRole");
      var data = { uid: uid, role: { [event.target.value]: true } };
      addMessage(data)
        .then(function (result) {
          console.log(result);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async addUser() {
      try {
        const res = await apiCaller.post("/users/register", {
          email: this.email,
          password: this.password,
        });
        if (res) {
          $("#modaalRegister").modal("hide");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User successfully added",
            showConfirmButton: false,
            timer: 1500,
          });
        }

        setTimeout(function () {
          location.reload();
        }, 500);
      } catch (err) {
        this.error = err.response.data.error;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    },
  },
};
</script>
