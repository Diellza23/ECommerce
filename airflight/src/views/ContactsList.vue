<template>
  <div class="container">
    <h3>Contact</h3>
    <table class="table" style="color: grey">
      <caption>
        List of contact messages
      </caption>
      <thead>
        <tr style="color: black">
          <th scope="col" style="color: orange">#</th>
          <th scope="col">Full Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone number</th>
          <th scope="col">Message</th>
          <th scope="col" style="color: grey">Operations</th>
        </tr>
      </thead>
      <tbody v-for="field in fields" :key="field.id">
        <tr>
          <th scope="row" style="color: orange">1</th>
          <td>{{ field.name }}</td>
          <td>{{ field.email }}</td>
          <td>{{ field.phone }}</td>
          <td>{{ field.message }}</td>
          <router-link
            class="btn btn-warning"
            style="width: 80px; color: grey"
            :to="{ name: 'ViewContact', params: { id: field._id } }"
          >
            View
          </router-link>
        </tr>
      </tbody>
    </table>
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
