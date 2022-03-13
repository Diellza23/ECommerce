<template>
  <div class="products">
    <div class="container">
      <div class="intro h-100">
        <div class="row h-100 align-items-center">
          <div class="col-md-6 ml-3">
            <h3>Profile settings</h3>

            <p>Change your profile settings here</p>
          </div>
          <div class="col-md-5">
            <img
              src="/img/svg/profile.svg"
              width="300"
              alt=""
              class="img-fluid"
            />
          </div>
        </div>
      </div>

      <div class="profile-content">
        <ul class="nav nav-pills ml-3" id="myTab" role="tablist">
          <li class="nav-item">
            <button
              class="nav-link"
              type="button"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile"
              role="tab"
              aria-controls="profile"
            >
              Profile
            </button>
          </li>

          <li class="nav-item">
            <button
              class="nav-link active"
              type="button"
              id="account-tab"
              data-bs-toggle="tab"
              data-bs-target="#account"
              role="tab"
              aria-controls="account"
            >
              Account settings
            </button>
          </li>
        </ul>

        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade pt-3"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div class="container" style="margin-top: 30px">
              <div class="row">
                <div class="col-md-6 mb-4">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="profile.name"
                      placeholder="Full name"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-6 mb-4">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="profile.phone"
                      placeholder="Phone"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-12 mb-4">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="profile.address"
                      placeholder="Address"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-8 mb-4">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="profile.postcode"
                      placeholder="Postcode"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="form-group">
                    <button
                      type="button"
                      @click="updateProfile()"
                      value="Save Changes"
                      class="btn btn-primary w-100"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="tab-pane fade pt-3 show active"
            id="account"
            role="tabpanel"
            aria-labelledby="account-tab"
          >
            <div class="container" style="margin-top: 20px">
              <div class="row">
                <div class="col-md-">
                  <div class="alert alert-info">
                    Forgot your password? <br />
                    Please use the Reset password email button for reseting the
                    password.
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <h6>Your email:</h6>
                    <h5 class="form-control">{{ email }}</h5>
                  </div>
                </div>

                <div class="col-md-6 mt-4">
                  <div class="form-group">
                    <input
                      type="button"
                      @click="resetPassword"
                      value="Reset password"
                      class="btn btn-success w-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../main";
import firebase from "firebase/compat/app";
import Toast from "sweetalert2";

export default {
  name: "profile",
  components: {},
  props: {
    msg: String,
  },
  data() {
    return {
      profiles: [],
      profile: {
        name: "",
        phone: "",
        address: "",
        postcode: "",
      },
      account: {
        name: null,
        email: null,
        photoUrl: null,
        emailVerified: null,
        password: null,
        confirmPassword: null,
        uid: null,
      },
      email: null,
    };
  },
  firestore() {
    return {
      profiles: db.collection("profiles"),
      profile: db.collection("profiles"),
    };
  },

  methods: {
    resetPassword() {
      const auth = firebase.auth();
      auth
        .sendPasswordResetEmail(auth.currentUser.email)
        .then(() => {
          Toast.fire({
            type: "success",
            title: "Email sent",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateProfile() {
      //REMINDER nese nuk behen update krejt fields gjun error :)
      firebase.firestore();
      db.collection("profiles")
        .doc(this.profile.id)
        .set({
          name: this.profile.name,
          phone: this.profile.phone,
          address: this.profile.address,
          postcode: this.profile.postcode,
        })
        .then(() => {
          console.log("document updated successfully check firestore");
          Toast.fire({
            icon: "success",
            title: "Updated successfully",
          });
        })
        .catch((err) => {
          console.log("An error occurred while updateing", +err.message);
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
