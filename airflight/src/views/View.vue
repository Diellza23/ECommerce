<template>
  <section class="container">
    <h1 style="margin-bottom: 40px; margin-top: 20px">Details View</h1>
    <div v-if="this.vueshop" class="card">
      <div class="card-body">
        <h5 class="card-title">Title: {{ this.vueshop.title }}</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          Description: {{ this.vueshop.description }}
        </li>
        <li class="list-group-item">Price: {{ this.vueshop.price }}</li>
        <li class="list-group-item">Category: {{ this.vueshop.category }}</li>
      </ul>
      <Dropzone
        :vueshopId="this.$route.params.id"
        :initialFiles="vueshop.files"
      />
    </div>
    <button
      @click="goToOffersList()"
      class="btn btn-outline-primary"
      style="width: 150px; margin-top: 25px; float: left"
    >
      Go back
    </button>
  </section>
</template>

<script>
import apiRequest from "../utility/apiRequest";
import axios from "axios";
import Dropzone from "@/components/form/Dropzone.vue";
export default {
  components: {
    Dropzone,
  },
  created() {
    this.fetchVueshop();
    axios
      .get(`http://localhost:4000/vueshop/list`)
      .then((response) => {
        this.fields = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },

  data() {
    return {
      vueshop: null,
      fields: [],
    };
  },

  methods: {
    async fetchVueshop() {
      this.vueshop = await apiRequest.getVueshop(this.$route.params.id);
    },
    async updateDoc(id) {
      try {
        // await apiRequest.updateMethod(id);
        axios
          .put(`http://localhost:4000/vueshop/put/${id}`, {
            title: this.vueshop.title,
          })
          .then((response) => {
            alert(response, "updated");
          })
          .catch((e) => {
            this.errors.push(e);
          });
        alert("updated");
        // window.location.reload();
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      }
    },
    goToOffersList() {
      this.$router.push("/admin/list");
    },
  },
};
</script>

<style scoped></style>
