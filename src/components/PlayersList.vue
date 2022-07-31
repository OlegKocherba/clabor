<template>
  <div class="players-list">
    <h2>Available players</h2>
    <ol>
      <li v-for="player in store.playersList" :key="player">
        <base-player :name="player.name" @delete="deletePlayer"></base-player>
      </li>
    </ol>
    <div class="list-actions">
      <Button
        label="Add player"
        class="p-button-success add-button"
        @click="showModal"
      />
      <Button
        label="Close"
        class="p-button-secondary close-button"
        @click="store.togglePlayersList()"
      />
    </div>
    <Dialog
      class="add-player"
      header="Add player to list"
      v-model:visible="displayModal"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '100vw' }"
      :modal="true"
    >
      <div class="add-form">
        <InputText v-model="inputData" />
        <Button icon="pi pi-check" @click="closeModal" autofocus />
      </div>
    </Dialog>
  </div>
</template>

<script>
import { ref } from "vue";

import BasePlayer from "./BasePlayer.vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import { useClaborStore } from "../stores/claborState";

export default {
  name: "PlayersList",
  components: { BasePlayer, Button, Dialog, InputText },
  setup() {
    const store = useClaborStore();
    const displayModal = ref(false);
    const inputData = ref("");
    const hideList = () => {
      store.togglePlayersList();
    };
    const deletePlayer = (name) => {
      store.deletePlayer(name);
    };
    const closeModal = () => {
      store.addPlayer(inputData.value);
      inputData.value = "";
      displayModal.value = false;
    };
    const showModal = () => (displayModal.value = true);

    return {
      store,
      hideList,
      deletePlayer,
      showModal,
      closeModal,
      displayModal,
      inputData,
    };
  },
};
</script>

<style scoped></style>
