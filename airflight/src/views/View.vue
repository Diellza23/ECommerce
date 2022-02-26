<template>
  <section v-if="this.vueshop">
    <div>
      <p>Type {{ this.vueshop.type }}</p>
      <p>Square Meters {{ this.vueshop.squareMeters }}</p>
      <p>Price {{ this.vueshop.price }}</p>

      <Dropzone />
    </div>
  </section>
</template>

<script>
import apiRequest from "../utility/apiRequest";
import Dropzone from "../components/form/Dropzone.vue";
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
