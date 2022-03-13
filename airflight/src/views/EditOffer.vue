<template>
  <section class="container">
    <h1 style="margin-bottom: 40px; margin-top: 20px">Edit Data</h1>
    <div v-if="this.vueshop" class="card">
      <div class="card-body">
        <input
          type="text"
          placeholder="title.."
          class="form-control"
          v-model="vueshop.title"
        />
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <input
            placeholder="desciption.."
            type="text"
            class="form-control"
            v-model="vueshop.description"
          />
        </li>
        <li class="list-group-item">
          <input
            type="text"
            placeholder="$.."
            class="form-control"
            v-model="vueshop.price"
          />
        </li>
        <li class="list-group-item">
          <input type="text" class="form-control" v-model="vueshop.category" />
        </li>
      </ul>
      <Dropzone
        :vueshopId="this.$route.params.id"
        :initialFiles="vueshop.files"
      />
    </div>
    <button
      @click="goToList()"
      class="btn btn-danger"
      style="width: 150px; margin-top: 30px; float: right; margin-left: 10px"
    >
      Go back
    </button>
    <button
      class="btn btn-outline-success"
      @click="updateDoc((id = vueshop._id))"
      style="width: 150px; margin-top: 30px; float: right"
    >
      Update
    </button>
  </section>
</template>

<script>
import apiRequest from "../utility/apiRequest";
import axios from "axios";
import Toast from "sweetalert2";
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
    goToList() {
      this.$router.push("/admin/list");
    },
    async fetchVueshop() {
      this.vueshop = await apiRequest.getVueshop(this.$route.params.id);
    },
    async updateDoc(id) {
      try {
        axios
          .put(`http://localhost:4000/vueshop/put/${id}`, {
            title: this.vueshop.title,
            description: this.vueshop.description,
            price: this.vueshop.price,
            category: this.vueshop.category,
          })
          .then(() => {
            Toast.fire({
              icon: "success",
              title: "Updated successfully",
            });
          });
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
</script>

<style scoped></style>
