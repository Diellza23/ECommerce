<template>
  <div class="container">
    <div class="row">
      <div
        class="col-md-4"
        v-for="field in fields"
        :key="field.id"
        style="margin-bottom: 20px"
      >
        <div class="card" style="width: 22rem">
          <Dropzone :vueshopId="field._id" :initialFiles="field.files" />
          <div class="card-body">
            <h5 class="card-title">Title: {{ field.title }}</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Price: {{ field.price }}</li>
            <li class="list-group-item">Category: {{ field.category }}</li>
          </ul>

          <div class="card-body">
            <router-link
              class="btn btn-outline-success"
              style="width: 80px"
              :to="{ name: 'View', params: { id: field._id } }"
            >
              View
            </router-link>

            <router-link
              class="btn btn-warning"
              style="width: 80px; margin-left: 10px; color: white"
              :to="{ name: 'EditOffer', params: { id: field._id } }"
            >
              Edit
            </router-link>
            <button
              class="btn btn-danger"
              @click="deleteDoc(field._id)"
              style="margin-left: 10px; width: 80px"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiRequest from "../utility/apiRequest";
import axios from "axios";
import Dropzone from "../components/form/Dropzone.vue";
export default {
  props: {
    vueshop: Object,
  },
  components: {
    Dropzone,
  },
  created() {
    axios
      .get(`http://localhost:4000/vueshop/list`)
      .then((response) => {
        this.fields = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
  methods: {
    async fetchVueshop() {
      this.vueshopList = await apiRequest.getVueShopList();
    },

    async deleteDoc(id) {
      try {
        await apiRequest.deleteMethod(id);
        window.location.reload();
      } catch (error) {
        console.log(error.message);
      }
    },
    async updateDoc(id) {
      try {
        await apiRequest.updateMethod(id);
        window.location.reload();
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  data() {
    return {
      fields: [],
    };
  },
  computed: {
    src() {
      const filename = this.vueshop.files?.split(";")[0];

      return filename ? `http://localhost:4000/static/${filename}` : null;
    },
  },
};
</script>
