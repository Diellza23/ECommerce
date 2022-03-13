<template>
  <div class="login">
    <form @submit.prevent="submit">
      <div
        class="modal fade"
        id="login"
        tabindex="-1"
        role="dialog"
        aria-labelledby="loginTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <ul
                class="nav nav-fill nav-pills mb-3"
                id="pills-tab"
                role="tablist"
              >
                <li class="nav-item">
                  <button
                    class="nav-link active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#pills-login"
                    type="button"
                    role="tab"
                    aria-controls="pills-login"
                  >
                    Login
                  </button>
                </li>
                <li class="nav-item">
                  <button
                    class="nav-link"
                    id="pills-home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#pills-register"
                    type="button"
                    role="tab"
                    aria-controls="pills-register"
                  >
                    Sign Up
                  </button>
                </li>
              </ul>

              <div class="tab-content" id="pills-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="pills-login"
                  role="tabpanel"
                  aria-labelledby="pills-login-tab"
                >
                  <h5 class="text-center" style="font-size: 24px">Login</h5>

                  <div
                    class="form-group"
                    style="margin-bottom: 20px"
                    :class="{ 'form-group--error': $v.email.$error }"
                  >
                    <label for="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      v-model.trim="$v.email.$model"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                    />
                    <div class="text-danger" v-if="!$v.email.required">
                      Email is required.
                    </div>
                  </div>
                  <div
                    class="form-group"
                    style="margin-bottom: 25px"
                    :class="{ 'form-group--error': $v.password.$error }"
                  >
                    <label for="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      @keyup.enter="loginUser"
                      v-model.trim="$v.password.$model"
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                    />
                    <div class="text-danger" v-if="!$v.password.required">
                      Password is required.
                    </div>
                  </div>

                  <p class="typo__p" v-if="submitStatus === 'PENDING'">
                    Signing in
                  </p>

                  <button
                    class="btn btn-outline-primary"
                    style="width: 50%"
                    :disabled="submitStatus === 'PENDING'"
                    @click="loginUser"
                  >
                    Sign in
                  </button>
                </div>
                <div
                  class="tab-pane fade"
                  id="pills-register"
                  role="tabpanel"
                  aria-labelledby="pills-register-tab"
                >
                  <h5 class="text-center">Sign Up</h5>

                  <div
                    class="form-group"
                    style="margin-bottom: 20px"
                    :class="{ 'form-group--error': $v.name.$error }"
                  >
                    <label for="name">Your name</label>
                    <input
                      type="text"
                      v-model.trim="$v.name.$model"
                      class="form-control"
                      id="name"
                      placeholder="Your name"
                    />
                    <div class="text-danger" v-if="!$v.name.required">
                      Name is required
                    </div>
                    <div class="text-danger" v-if="!$v.name.minLength">
                      Name must have at least
                      {{ $v.name.$params.minLength.min }} letters.
                    </div>
                  </div>

                  <div
                    class="form-group"
                    style="margin-bottom: 20px"
                    :class="{ 'form-group--error': $v.email.$error }"
                  >
                    <label for="email">Email address</label>
                    <input
                      type="email"
                      v-model.trim="$v.email.$model"
                      class="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                    />
                    <div class="text-danger" v-if="!$v.email.required">
                      Email is required!
                    </div>
                    <div class="text-danger" v-if="!$v.email.minLength">
                      Email must have at least
                      {{ $v.email.$params.minLength.min }} characters.
                    </div>
                  </div>
                  <div
                    class="form-group"
                    style="margin-bottom: 20px"
                    :class="{ 'form-group--error': $v.password.$error }"
                  >
                    <label for="password">Password</label>
                    <input
                      type="password"
                      @keyup.enter="createUser"
                      v-model.trim="$v.password.$model"
                      class="form-control"
                      id="password"
                      placeholder="Password"
                    />
                    <div class="text-danger" v-if="!$v.password.required">
                      Password is required!
                    </div>
                    <div class="text-danger" v-if="!$v.password.minLength">
                      Password must contain at least
                      {{ $v.password.$params.minLength.min }} characters.
                    </div>
                  </div>

                  <p class="text-danger" v-if="submitStatus === 'ERROR'">
                    Please fill the form correctly.
                  </p>
                  <p class="typo__p" v-if="submitStatus === 'PENDING'">
                    Signing up...it might take a moment
                  </p>
                  <div
                    class="form-group"
                    style="display: flex; justify-content: right"
                  >
                    <button
                      type="submit"
                      class="btn btn-outline-primary"
                      style="width: 50%"
                      :disabled="submitStatus === 'PENDING'"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import "firebase/compat/auth";
import $ from "jquery";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

import apiCaller from "@/utility/apiRequest/apiCaller";

export default {
  name: "Login",
  props: {
    msg: String,
  },

  data() {
    return {
      name: "",
      email: "",
      password: "",
      error: null,
      submitStatus: null,
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(4),
    },
    email: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(30),
    },
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(30),
    },
  },

  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.submitStatus = "PENDING";
        this.createUser();
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
    },
    async createUser() {
      const auth = getAuth();
      try {
        const res = await apiCaller.post("/users/register", {
          email: this.email,
          password: this.password,
        });

        if (res) {
          await signInWithEmailAndPassword(auth, this.email, this.password);
        }

        if (this.email.includes("ubt-uni.net")) {
          this.$router.replace("/admin/profile");
          location.reload();
        } else {
          this.$router.replace("/userProfile");
          location.reload();
        }
        $("#login").modal("hide");
      } catch (err) {
        this.error = err.response.data.error;
        alert(err.message);
      }
    },
    async loginUser() {
      if (
        this.email == "" ||
        this.email == null ||
        this.password == "" ||
        this.password == null
      ) {
        return;
      }
      const auth = getAuth();

      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);

        if (this.email.includes("ubt-uni.net")) {
          this.$router.replace("/admin/profile");
        } else {
          this.$router.replace("/userProfile");
          // location.reload();
        }
      } catch (err) {
        this.error = err;
        alert(err.message);
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
