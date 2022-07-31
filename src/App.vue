<template>
  <router-view></router-view>
</template>

<script setup>
import { useClaborStore } from "./stores/claborState";
import "../src/assets/base.scss";
import { onBeforeMount } from "vue";

const store = useClaborStore();
const savedStore = localStorage.getItem("game");
onBeforeMount(() => {
  if (savedStore) {
    store.$patch({ ...store, ...JSON.parse(savedStore) });
  }
});
</script>

<style></style>
