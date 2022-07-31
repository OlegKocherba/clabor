<template>
  <div class="input-modal">
    <Dialog
      header="Header"
      v-model:visible="displayModal"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '100vw' }"
      :modal="true"
    >
      <InputText />
      <InputNumber />
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          @click="closeModal"
          class="p-button-text"
        />
        <Button label="Yes" icon="pi pi-check" @click="closeModal" autofocus />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { ref } from "vue";

import Button from "primevue/button";
import Dialog from "primevue/dialog";

export default {
  name: "InputModal",
  components: {
    Button,
    Dialog,
  },
  props: {
    inputData: {
      type: String,
    },
    fieldType: {
      type: String, //text, number
    },
  },
  setup(props, { emit }) {
    const value = ref("");
    const displayModal = ref(false);
    const closeModal = () => (displayModal.value = false);
    return {
      value,
      displayModal,
      closeModal,
    };
  },
};
</script>

<style scoped></style>
