<template>
  <section>
    <div v-if="this.vueshop" class="row justify-content-center">
      <div class="col-5 col-md-8 col-lg-8">
        <div class="flex">
          <p>Title: {{ this.vueshop.title }}</p>
          <p>Description: {{ this.vueshop.description }}</p>
          <p>Price: {{ this.vueshop.price }}</p>
          <p>Category: {{ this.vueshop.category }}</p>
        </div>
        <Dropzone
          :vueshopId="this.$route.params.id"
          :initialFiles="vueshop.files"
        />
      </div>
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
