<template>
  <div class="home">
    <Navbar></Navbar>
    <div class="">
      <div
        id="carousel-example-2"
        class="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <!--Indicators-->
        <ol class="carousel-indicators">
          <li
            data-bs-target="#carousel-example-2"
            data-bs-slide-to="0"
            class="active"
          ></li>
          <li data-bs-target="#carousel-example-2" data-bs-slide-to="1"></li>
          <li data-bs-target="#carousel-example-2" data-bs-slide-to="2"></li>
        </ol>
        <!--/.Indicators-->
        <!--Slides-->
        <div class="carousel-inner" role="listbox">
          <div class="carousel-item active">
            <div class="view">
              <img
                class="d-block w-100"
                src="https://storage-asset.msi.com/global/picture/banner/banner_1620637220ba7bd83b787a67761ef60081d80bee56.jpeg"
                alt="First slide"
              />
              <div class="mask rgba-black-light"></div>
            </div>
            <div class="carousel-caption"></div>
          </div>
          <div class="carousel-item">
            <!--Mask color-->
            <div class="view">
              <img
                class="d-block w-100"
                src="https://storage-asset.msi.com/global/picture/banner/banner_1620635919f28c2997eeedd568b072ea04ca5a67c1.jpeg"
                alt="Second slide"
              />
              <div class="mask rgba-black-strong"></div>
            </div>
          </div>
          <div class="carousel-item">
            <!--Mask color-->
            <div class="view">
              <img
                class="d-block w-100"
                src="https://storage-asset.msi.com/global/picture/banner/banner_16206346080811b46b44b65364efbf6898a5b9cbc5.jpeg"
                alt="Third slide"
              />
              <div class="mask rgba-black-slight"></div>
            </div>
          </div>
        </div>
        <!--/.Slides-->
        <!--Controls-->
        <a
          class="carousel-control-prev"
          href="#carousel-example-2"
          role="button"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carousel-example-2"
          role="button"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>

    <Hero />

    <products-list />

    <div class="container h-100">
      <div class="row p-5 h-100 justify-content-center align-items-center">
        <div class="col-md-6">
          <img src="/img/online.jpg" alt="" width="400" />
        </div>
        <div class="col-md-6">
          <h3>Learn More About us</h3>
          <p>
            Protected by reCAPTCHA. The Google Privacy Policy and Terms of
            Service apply. Privacy Policy | Opt out anytime
          </p>
          <button class="btn custom-btn btn-outline-primary mr-4">
            Browse Products
          </button>
        </div>
      </div>
    </div>
    <Login></Login>

    <mini-cart></mini-cart>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from "@/components/Hero.vue";
import Login from "@/components/Login.vue";
import Footer from "./Footer.vue";

export default {
  name: "home",
  components: {
    Hero,
    Login,
    Footer,
  },
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
    onSubmit(evt) {
      evt.preventDefault();
    },
  },
};
</script>

<style scoped>
@media (max-width: 575.98px) {
  .bv-example-row {
    display: block;
    width: 280px;
    height: auto;
    padding: 5px;
  }
}

.product-img {
  border: 1px solid lightgrey;
  padding: 7px;

  background-color: white;
  border-radius: 3%;
}
.titulli {
  color: #c60021;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: bold;
  font-size: 1.5rem;
}
.price {
  color: black;
  font-size: 1.2rem;
}
.euro {
  font-size: 1rem;
  color: gray;
}
.single-new-pro .product-img {
  overflow: hidden;
  margin-bottom: 15px;
}

.single-new-pro .product-img img {
  width: 100%;
  transform: scale(1);
  -webkit-transition: all 0.4s ease-out 0s;
  -moz-transition: all 0.4s ease-out 0s;
  -ms-transition: all 0.4s ease-out 0s;
  -o-transition: all 0.4s ease-out 0s;
  transition: all 0.4s ease-out 0s;
}
.single-product .product-img {
  position: relative;
  overflow: hidden;
}

.text-center {
  text-align: center !important;
}
</style>
