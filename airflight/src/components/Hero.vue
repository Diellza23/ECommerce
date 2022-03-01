<template>
  <div class="hero">
    <div class="container h-100">
      <div class="row h-100 justify-content-center align-items-center">
        <div class="col-md-5">
          <div class="hero-content">
            <h1 class="hero-title">Shop Electronics</h1>
            <p>
              Multi-purpose Cell Phones Offer Optimal Performance and Many Apps
            </p>
            <p>High-quality Tech Offer Privacy and Comfort</p>
            <p>Top Sellers in Electronics</p>
            <div class="hero-btn mt-5">
              <button class="btn custom-btn btn-info mr-4" disabled>
                Explore
              </button>
              <button class="btn custom-btn btn-outline-secondary">
                Products
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <div class="graphic">
            <img src="/img/online.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hero",
  props: {
    msg: String,
  },
};
</script>

<style scoped lang="scss">
.hero {
  padding-top: 7rem;
  width: 100%;
  height: 500px;
  text-align: left;
}
</style>
