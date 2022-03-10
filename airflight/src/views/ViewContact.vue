<template>
  <section class="container" style="width: 700px">
    <h2 style="margin-bottom: 40px; margin-top: 20px">Specified message</h2>
    <div v-if="this.contact" class="card">
      <div class="card-body">
        <h5 class="card-title">Name: {{ this.contact.name }}</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Email: {{ this.contact.email }}</li>
        <li class="list-group-item">Phone number: {{ this.contact.phone }}</li>
        <li
          class="list-group-item"
          style="height: 130px; font-size: 18px; border: 1px solid pink"
        >
          Message: {{ this.contact.message }}
        </li>
      </ul>
    </div>
    <button
      @click="goToContactsList()"
      class="btn btn-primary"
      style="width: 150px; margin-top: 25px; float: left"
    >
      Go back
    </button>
  </section>
</template>

<script>
import apiRequest from "../utility/apiRequest";
export default {
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
    goToContactsList() {
      this.$router.push("/admin/contactsList");
    },
  },
};
</script>
