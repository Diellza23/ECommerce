<template>
  <VueDropzone id="dropzone" ref="filesDropzone" :options="dropzoneOptions" />
</template>

<script>
import VueDropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

export default {
  components: {
    VueDropzone,
  },
  data() {
    return {
      dropzoneOptions: {
        url: `https://localhost:4000/vueshop/${this.vueshopId}/uploadFile`,
        method: "put",
      },
    };
  },
};
</script>
