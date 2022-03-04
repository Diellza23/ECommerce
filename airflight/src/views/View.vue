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
  </section>
</template>

<script>
import apiRequest from "../utility/apiRequest";
import Dropzone from "@/components/form/Dropzone.vue";
export default {
  components: {
    Dropzone,
  },
  created() {
    this.fetchVueshop();
  },

  data() {
    return {
      vueshop: null,
    };
  },
  methods: {
    async fetchVueshop() {
      this.vueshop = await apiRequest.getVueshop(this.$route.params.id);
    },
  },
};
</script>

<style scoped></style>
