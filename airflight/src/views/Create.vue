<template>
  <section>
    <div class="container">
      <h3 style="margin-bottom: 50px">Add Vueshop</h3>

      <form @submit.prevent="createVueshop">
        <div class="form-row">
          <div class="col-md-4 mb-3">
            <label for="validationDefault01" style="padding-bottom: 10px"
              >Type:</label
            >
            <Dropdown
              v-model="form.type"
              :options="[
                { label: 'Flat', value: 'flat' },
                { label: 'House', value: 'house' },
              ]"
            />
          </div>
          <div class="col-md-4 mb-3">
            <label for="validationDefault02" style="padding-bottom: 10px"
              >Square Meters:</label
            >
            <NumberInput v-model="form.squareMeters" />
          </div>
          <div class="col-md-4 mb-3">
            <label for="validationDefault02" style="padding-bottom: 10px"
              >Number of rooms:</label
            >
            <NumberInput v-model="form.rooms" />
          </div>
          <div class="col-md-4 mb-3">
            <label for="validationDefaultUsername" style="padding-bottom: 10px"
              >Price:</label
            >
            <div class="input-group" style="padding-bottom: 10px">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroupPrepend2">$</span>
              </div>
              <NumberInput v-model="form.price" />
            </div>
          </div>
        </div>

        <button class="btn btn-primary" type="submit">Submit form</button>
      </form>
    </div>
  </section>
</template>

<script>
import apiRequest from "../utility/apiRequest/";
import Dropdown from "../components/form/Dropdown.vue";
import NumberInput from "../components/form/NumberInput.vue";

export default {
  components: {
    Dropdown,
    NumberInput,
  },
  data() {
    return {
      form: {
        type: "flat",
        squareMeters: 0,
        price: 0,
      },
      error: null,
    };
  },
  methods: {
    async createVueshop() {
      // const validationResult = vueShopSchema.validate(this.form)
      // if(validationResult.error) {
      //     this.error = error;
      //     return;
      // }

      const newVueshop = await apiRequest.createVueshop({ ...this.form });
      this.$router.push({ name: "View", params: { id: newVueshop._id } });
    },
  },
};
</script>
