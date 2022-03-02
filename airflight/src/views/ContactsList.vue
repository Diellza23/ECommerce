<template>
  <div class="container">
    <div class="row">
      <!--:key="field"-->
      <div
        class="col-md-4"
        v-for="field in fields"
        :key="field.id"
        style="margin-bottom: 20px"
      >
        <div class="card" style="width: 18rem">
          <!-- <img
            class="card-img-top"
            src=""
          />  -->
          <div class="card-body">
            <h5 class="card-title">Full Name: {{ field.name }}</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Email: {{ field.email }}</li>
            <li class="list-group-item">Phone number: {{ field.phone }}</li>
            <li class="list-group-item">Message: {{ field.message }}</li>
          </ul>
          <div class="card-body">
            <!-- <router-link class="btn btn-primary">View</router-link> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiRequest from "../utility/apiRequest";
import axios from "axios";
export default {
  props: {
    contact: Object,
  },
  components: {},
  created() {
    axios
      .get(`http://localhost:4000/contact/list`)
      .then((response) => {
        this.fields = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });

    // this.vueshopList = await apiRequest.getVueShopList();
    // this.fetchVueshop();
  },
  methods: {
    async fetchContact() {
      this.contactList = await apiRequest.getContactList();
      //   const result = await apiRequest.getVueshopList();
      //   this.$store.dispatch("fetchVueshops", result);
    },
  },
  data() {
    return {
      fields: [],
    };
  },
  computed: {},
};
</script>
