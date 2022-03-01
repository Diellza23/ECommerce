<template>
  <div class="container">
    <div class="row">
      <div
        class="col-md-4"
        v-for="field in fields"
        :key="field"
        style="margin-bottom: 20px"
      >
        <div class="card" style="width: 18rem">
          <!-- <img
            class="card-img-top"
            src=""
          />  -->
          <div class="card-body">
            <h5 class="card-title">Type: {{ field.type }}</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Price: {{ field.price }}</li>
            <li class="list-group-item">Sqr: {{ field.squareMeters }}</li>
            <li class="list-group-item">Number of rooms: {{ field.rooms }}</li>
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
    vueshop: Object,
  },
  components: {},
  created() {
    axios
      .get(`http://localhost:4000/vueshop/list`)
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
    async fetchVueshop() {
      this.vueshopList = await apiRequest.getVueShopList();
      //   const result = await apiRequest.getVueshopList();
      //   this.$store.dispatch("fetchVueshops", result);
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
