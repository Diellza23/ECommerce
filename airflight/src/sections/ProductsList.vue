<template>
  <div class="products" id="products">
    <div class="container">
      <h1
        class="text-center p-5"
        style="text-transform: uppercase; font-family: italic"
      >
        Scroll to see our customized products
      </h1>
      <div class="row">
        <div
          class="col-md-4"
          v-for="product in products"
          :key="product"
          style="margin-bottom: 20px"
        >
          <div class="card product-item">
            <div>
              <VueSlickCarousel :arrows="true" :dots="true">
                <div
                  v-for="(image, index) in product.images"
                  v-bind:key="index.id"
                >
                  <img
                    :src="image"
                    class="card-img-top"
                    alt="..."
                    width="280px"
                    height="300px"
                  />
                </div>
              </VueSlickCarousel>
            </div>

            <div class="card-body">
              <div class="d-flex justify-content-between">
                <h5 class="card-title">{{ product.name }}</h5>
                <h5 class="card-priceS">{{ product.price | currency }}</h5>
              </div>

              <add-to-cart
                :image="getImage(product.images)"
                :p-id="product.id"
                :price="product.price"
                :name="product.name"
              >
              </add-to-cart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../main";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  components: { VueSlickCarousel },
  name: "Products-list",
  props: {
    msg: String,
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    getImage(images) {
      return images[0];
    },
  },
  firestore() {
    return {
      products: db.collection("products"),
    };
  },
};
</script>

<style scoped lang="scss">
.products {
  margin-top: 7rem;
  background: #f2f2f2;
  padding-bottom: 3rem;
}
</style>
