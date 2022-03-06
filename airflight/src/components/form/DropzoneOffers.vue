<template>
  <VueDropzone
    id="dropzone"
    ref="filesDropzone"
    :options="dropzoneOptions"
    :useCustomSlot="true"
    @vdropzone-mounted="handleMount"
    class="dz-max-files-reached"
  >
  </VueDropzone>
</template>

<script>
import VueDropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import apiRequest from "../../utility/apiRequest";

export default {
  components: {
    VueDropzone,
  },
  props: {
    vueshopId: String,
    initialFiles: String,
  },
  data() {
    return {
      dropzoneOptions: {
        url: `http://localhost:4000/vueshop/${this.vueshopId}`,
        thumbnailWidth: 180,
      },
    };
  },
  methods: {
    async handleMount() {
      if (!this.initialFiles || this.initialFiles.length === 0) {
        return;
      }

      const documentFiles = await apiRequest.getFilesDetails(this.initialFiles);

      documentFiles.forEach(({ fileDetails, fileUrl }) => {
        this.$refs.filesDropzone.manuallyAddFile(
          fileDetails,
          `http://localhost:4000/${fileUrl}`
        );
      });
    },
  },
};
</script>
<style>
.dz-max-files-reached {
  pointer-events: none;
  cursor: none;
}
</style>
