<template>
  <div class="login">
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
              
                <h5 class="text-center" style="font-size:24px;">Login </h5>

                <div class="form-group" style="margin-bottom:20px">
                  <label for="exampleInputEmail1" >Email address</label>
                  <input
                    type="email"
                    v-model="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                  
                </div>
                <div class="form-group"  style="margin-bottom:25px">
                  <label for="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    @keyup.enter="loginUser"
                    v-model="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                  />
                </div>

                <div class="form-group">
                  <button class="btn btn-outline-primary" @click="loginUser" style="width:50%">Sign in</button>
                </div>

              </div>
              <div
                class="tab-pane fade"
                id="pills-register"
                role="tabpanel"
                aria-labelledby="pills-register-tab"
              >
                <h5 class="text-center">Sign Up</h5>

                <div class="form-group" style="margin-bottom:20px">
                  <label for="name">Your name</label>
                  <input
                    type="text"
                    v-model="name"
                    class="form-control"
                    id="name"
                    placeholder="Your name"
                  />
                </div>

                <div class="form-group" style="margin-bottom:20px">
                  <label for="email">Email address</label>
                  <input
                    type="email"
                    v-model="email"
                    class="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                <div class="form-group" style="margin-bottom:20px">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    @keyup.enter="createUser"
                    v-model="password"
                    class="form-control"
                    id="password"
                    placeholder="Password"
                  />
                </div>

                <div class="form-group" style="display:flex;justify-content:right">
                  <button class="btn btn-outline-primary" style="width: 50%;" @click="createUser">
                    Register
                  </button>
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
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import $ from "jquery";
import {db} from '../main'
// import axios from 'axios'
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth'

// import apiRequest from '@/utility/apiRequest/apiRequest';

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
      error:null
    };
  },
  methods: {
    // async createUser() {
    //   try{
    //     await apiRequest.registerUser(this.email,this.password)
    //       $('#login').modal('hide');
    //       this.$router.replace('about');  
    //     //  this.$router.replace({name: 'Listing'});
    //   }
    //   catch(err){
    //     this.error = err.response.data.error;
    //     alert("Email address taken")
    //   }
    // },

    async loginUser(){
        const auth = getAuth();
        try{
          await signInWithEmailAndPassword(auth, this.email, this.password)
          this.$router.replace('list')
        }
        catch(err){
            this.error = err
        }
          
    }

      // ,login(){
      //     firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      //                   .then(() => {
      //                   $('#login').modal('hide');
      //                     this.$router.replace('admin');  
      //                     location.reload();
      //                   })
      //                   .catch(function(error) {
      //                       var errorCode = error.code;
      //                       var errorMessage = error.message;
      //                       if (errorCode === 'auth/wrong-password') {
      //                           alert('Wrong password provided.');
      //                       } else {
      //                           alert(errorMessage);
      //                       }
      //                       console.log(error);
      //               });
      // },
      ,
    createUser() {
      firebase.auth().createUserWithEmailAndPassword(
        this.email, 
        this.password
        )
        .then((user) => {
          $("#login").modal("hide");
          // console.log(user);

          db.collection("profiles").doc(user.user.uid).set({
            name:this.name
          })
          .then(function(){
            console.log("Document successfully written!");
          })
          .catch(function(error){
            console.error("Error writing doc: ",error)
          })
          
          this.$router.replace('admin');
          location.reload();
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == "auth/weak-password") {
            alert("The password is too weak.");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    },
  },
};
</script>

<style scoped lang="scss">
</style>