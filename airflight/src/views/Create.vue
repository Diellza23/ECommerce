<template>
  <section>
    <div class="container">
      <h3 style="margin-bottom: 50px">Add Offer</h3>

      <form @submit.prevent="createVueshop">
        <div class="form-row">
          <div class="col-md-6">
            <label for="validationDefault01" style="padding-bottom: 10px"
              >Title:</label
            >
            <div class="form-group">
              <input type="text" v-model="form.title" class="form-control" />
            </div>
          </div>

          <div class="col-md-6">
            <label for="validationDefault01" style="padding-bottom: 10px"
              >Description:</label
            >
            <div class="form-group">
              <input
                type="text"
                v-model="form.description"
                class="form-control"
              />
            </div>
          </div>

          <div class="col-md-6">
            <label for="validationDefaultUsername" style="padding-bottom: 10px"
              >Price:</label
            >
            <div class="input-group" style="padding-bottom: 10px">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroupPrepend2">$</span>
              </div>
              <input type="text" v-model="form.price" class="form-control" />
              <!-- <NumberInput v-model="form.price" /> -->
            </div>
          </div>

          <div class="col-md-6 mb-5">
            <label for="validationDefault01" style="padding-bottom: 10px"
              >Category:</label
            >
            <Dropdown
              v-model="form.category"
              :options="[
                { label: 'Electrics', value: 'electrics' },
                { label: 'Tech', value: 'tech' },
                { label: 'Other', value: 'other' },
              ]"
            />
          </div>
        </div>

        <button class="btn btn-primary" type="submit">Submit</button>
        <button
          class="btn btn-outline-danger"
          @click="goToOffersList()"
          style="margin-left: 15px"
        >
          Dismiss
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import apiRequest from "../utility/apiRequest/";
import Dropdown from "../components/form/Dropdown.vue";

export default {
  components: {
    Dropdown,
  },
  data() {
    return {
      form: {
        title: "",
        description: "",
        price: "",
        category: "select",
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
    goToOffersList() {
      this.$router.push("/admin/list");
    },
  },
};
</script>
