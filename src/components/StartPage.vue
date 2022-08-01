<template>
  <base-page class="start-page">
    <template #content>
      <div class="logo">
        <i class="pi pi-prime" style="font-size: 10rem"></i>
      </div>
    </template>
    <template #actions>
      <div class="button-wrapper">
        <Button
          label="Start"
          class="p-button-lg p-button-success"
          @click="startGame"
        />
        <!--        <Button label="Players" @click="store.togglePlayersList" />-->
      </div>
    </template>
  </base-page>
</template>

<script setup>
import Button from "primevue/button";
import router from "../router/router";
import BasePage from "../components/BasePage.vue";

import { useClaborStore } from "../stores/claborState";
const store = useClaborStore();
const startGame = () => {
  router.push({ name: "game-setup" });
};
</script>

<style lang="scss" scoped>
.start-page {
  .content {
    align-items: center;
    justify-content: center;
  }
  .logo {
    flex: 1;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .button-wrapper {
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 1rem;
  }
}
</style>
