<script setup>
// import { ref, computed } from "vue";
import router from "../router/router";
// import BasePlayer from "./BasePlayer.vue";
import InputText from "primevue/inputtext";
import SelectButton from "primevue/selectbutton";
import Button from "primevue/button";
// import MultiSelect from "primevue/multiselect";
import { useClaborStore } from "@/stores/claborState";
import BasePage from "./BasePage.vue";
import { ref } from "vue";

const store = useClaborStore();

const fullScores = ref([
  { value: 1001, name: "Big game" },
  { value: 501, name: "Small game" },
]);
// const selectedTeam1 = ref();
// const selectedTeam2 = ref();
// const playersListTeam1 = computed(() => {
//   return store.playersList.filter((el) => {
//     return el.team !== "teamTwo";
//   });
// });
// const playersListTeam2 = computed(() => {
//   return store.playersList.filter((el) => {
//     return el.team !== "teamOne";
//   });
// });
const startGame = () => {
  router.push("/round-setup");
};
</script>
<template>
  <base-page class="teams-setup" page-title="Teams setup">
    <template #content>
      <div class="full-game-score">
        <SelectButton
          v-model="store.fullGame"
          :options="fullScores"
          data-key="value"
        >
          <template #option="slotProps">
            <span>{{ slotProps.option.name }}</span
            ><span></span>
          </template>
        </SelectButton>
      </div>
      <div class="setup-table">
        <div class="team-one team">
          <h3 class="label">Team 1</h3>
          <InputText v-model="store.teamOne" class="title" />
          <!--        <MultiSelect-->
          <!--          v-model="selectedTeam1"-->
          <!--          :options="playersListTeam1"-->
          <!--          optionLabel="name"-->
          <!--          placeholder="Select Players"-->
          <!--          :selectionLimit="2"-->
          <!--          :showToggleAll="false"-->
          <!--          @change="(e) => store.updatePlayersList(e, 'teamOne')"-->
          <!--        />-->
          <!--        <div class="team-players">-->
          <!--          <base-player-->
          <!--            v-for="player in store.teamOneList"-->
          <!--            :name="player.name"-->
          <!--            :key="player.name"-->
          <!--          ></base-player>-->
          <!--        </div>-->
          <!--        <Button-->
          <!--          label="Add Player"-->
          <!--          class="p-button-lg add-button"-->
          <!--          @click="addToTeam"-->
          <!--        />-->
        </div>
        <div class="team-two team">
          <h3 class="label">Team 2</h3>
          <InputText v-model="store.teamTwo" class="title" />
          <!--        <div class="team-players">-->
          <!--          <base-player-->
          <!--            v-for="player in store.teamTwoList"-->
          <!--            :name="player.name"-->
          <!--            :key="player.name"-->
          <!--          ></base-player>-->
          <!--        </div>-->
          <!--        <Button-->
          <!--          label="Add Player"-->
          <!--          class="p-button-lg add-button"-->
          <!--          @click="addToTeam"-->
          <!--        />-->
        </div>
      </div>
    </template>
    <template #actions>
      <Button
        label="Start game"
        class="p-button-lg start-button"
        @click="startGame"
      />
    </template>
  </base-page>
</template>
<style scoped></style>
