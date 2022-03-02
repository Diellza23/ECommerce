<template>
  <div class="home">
    <Navbar></Navbar>
    <Login></Login>
    <div class="container">
      <div class="row">
        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <div class="about-details-cap p-2 pt-3 pl-2 pr-2 pb-0">
            <h4 class="pt-3">Our Mission</h4>
            <p>
              To serve consumers through online and physical stores and focus on
              selection, price, and convenience
            </p>
          </div>

          <div class="about-details-cap p-2 pt-3 pl-2 pr-2 pb-3">
            <h4>Our Vision</h4>
            <p>
              Our vision is to be earth's most customer centric company; to
              build a place where people can come to find and discover anything
              they might want to buy from tech online
            </p>
            <p>
              Praesent pulvinar pulvinar fringilla. Fusce porttitor odio in
              sapien elementum, at semper lectus mollis. Etiam et mauris eget
              lorem varius congue. Curabitur sagittis augue hendrerit pretium
              pellentesque. Cras ac tincidunt urna. Aenean maximus in erat eu
              interdum.
            </p>
          </div>
        </div>
        <div
          class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 pt-4 map img-fluid"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2937.6209566262937!2d21.12899141586645!3d42.584567179172396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13549d539fe9170f%3A0x96a018472c30145!2sGjirafa%2C%20Inc!5e0!3m2!1sen!2s!4v1621186396607!5m2!1sen!2s"
            height="450"
            width="100%"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
    <div class="shop-method-area m-5">
      <div class="container p-4 m-2">
        <div class="method-wrapper">
          <div class="row d-flex justify-content-between">
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div class="single-method mb-40">
                <img class="icon" src="../assets/cart.jpg" alt="" />
                <h6>Free Shipping Method</h6>
              </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div class="single-method mb-40">
                <img class="icon" src="../assets/secure.png" alt="" />
                <h6>Secure Payment System</h6>
              </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div class="single-method mb-40">
                <img class="icon" src="../assets/time.png" alt="" />
                <h6>24/7 Assistance</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-container">
      <div class="footer-title">
        <h4>Support</h4>
        <ul class="pt-2">
          <li class="pt-1">+38349123456</li>
          <li class="pt-1">vueshop@support.com</li>
          <li class="pt-1">Magjistralja Prishtine-Ferizaj km.6</li>

          <li><a href="https://www.facebook.com/">Facebook</a></li>
          <li><a href="https://www.instagram.com/">Instagram</a></li>
        </ul>
      </div>
    </div>

    <mini-cart></mini-cart>
  </div>
</template>

<script>
import Login from "../components/Login.vue";
export default {
  name: "about",

  components: {
    Login,
  },
};
</script>

<style scoped>
.icon {
  height: 100px;
  width: 100px;
}
.footer-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
h4 {
  color: #4b4143;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: bold;
  font-size: 1.5rem;
}
p {
  text-align: justify;
  text-justify: inter-word;
}
.aboutus {
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
.map {
  border: 1px solid black;
}
.img-fluid {
  max-height: 100%;
  max-width: 100%;
}
.shop-method-area {
  border: 1px solid #4b4143;
}

.about-details .about-details-cap h4 {
  font-size: 30px;
  font-family: "Josefin Sans", sans-serif;
  font-weight: 700;
  margin-bottom: 30px;
  color: #000a2d;
  display: inline-block;
  position: relative;
  padding-left: 68px;
}

.about-details .about-details-cap h4::before {
  position: absolute;
  content: "";
  width: 54px;
  height: 2px;
  background: #eb566c;
  top: 0;
  left: 0px;
  top: 50%;
  transform: translateY(-50%);
}

.about-details .about-details-cap p {
  color: #464d65;
  font-size: 14px;
}

.about_us .about_us_video {
  position: relative;
}

.about_us .about_us_content h5 {
  font-size: 20px;
  color: #ff2020;
  font-weight: 400;
}
</style>

<script>
import Navbar from "../components/Navbar.vue";
export default {
  components: { Navbar },
  name: "about",
};
</script>
