<template>
  <section>
    <div v-if="this.contact" class="row justify-content-center">
      <div class="col-5 col-md-8 col-lg-8">
        <div class="flex">
          <p>Full Name: {{ this.contact.name }}</p>
          <p>Email: {{ this.contact.email }}</p>
          <p>Phone Number: {{ this.contact.phone }}</p>
          <p>Message: {{ this.contact.message }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import apiRequest from "../utility/apiRequest";
export default {
  components: {
    Dropzone,
  },
  created() {
    this.fetchContact();
  },

  data() {
    return {
      contact: null,
    };
  },
  methods: {
    async fetchContact() {
      this.contact = await apiRequest.getContact(this.$route.params.id);
    },
  },
};
</script>

<style scoped></style>
