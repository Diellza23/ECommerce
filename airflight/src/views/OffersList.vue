<template>
  <div>
    <Navbar />

    <div class="container">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"
        integrity="sha256-mmgLkCYLUQbXn0B1SRqzHar6dCnv9oZFPEC1g1cwlkk="
        crossorigin="anonymous"
      />
      <div class="row">
        <div class="col-xl-3 col-lg-6" v-for="field in fields" :key="field.id">
          <div class="card l-bg-blue-dark">
            <div class="card-statistic-3 p-4">
              <!--Qitu-->
              <span class="discount">Up to 30% off</span>
              <DropzoneOffers
                :vueshopId="field._id"
                :initialFiles="field.files"
                style="padding-right: 50px"
              />

              <div class="list-group list-group-flush">
                <h5 class="card-priceS" style="text-align: right; color: grey">
                  {{ field.price | currency }}
                </h5>
              </div>

              <div class="card-body">
                <router-link
                  class="btn btn-outline-danger"
                  style="width: 110px; margin-left: -15px"
                  :to="{ name: 'offersDetails', params: { id: field._id } }"
                >
                  See Details
                </router-link>
                <a
                  class="btn btn-outline-info border-0 mx-2 my-2 my-sm-0"
                  data-bs-toggle="modal"
                  data-bs-target="#miniCart"
                >
                  <i class="fas fa-cart-plus"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <mini-cart></mini-cart>
  </div>
</template>

<script>
import apiRequest from "../utility/apiRequest";
import axios from "axios";
import DropzoneOffers from "../components/form/DropzoneOffers.vue";
import MiniCart from "../components/MiniCart.vue";
export default {
  props: {
    vueshop: Object,
  },
  components: {
    DropzoneOffers,
    MiniCart,
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

<style>
.l-bg-blue-dark {
  background: linear-gradient(to right, #f6f8fc, #f6f8fc) !important;
  color: #fff;
  margin-bottom: 15px;
}

.l-bg-cyan {
  background: linear-gradient(135deg, #289cf5, #84c0ec) !important;
  color: #fff;
}
.discount {
  position: absolute;
  top: 25px;
  left: 25px;
  color: #ffffff;
  background-color: #fe302f;
  padding: 2px 8px;
  text-transform: uppercase;
  font-size: 0.85rem;
}
</style>
