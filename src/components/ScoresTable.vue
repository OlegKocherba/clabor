<script setup>
import { computed, onMounted } from "vue";

import router from "../router/router";
import BasePage from "./BasePage.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Badge from "primevue/badge";
import Dialog from "primevue/dialog";
import { useClaborStore } from "@/stores/claborState";
const store = useClaborStore();

const continueGame = () => {
  if (store.isGameOn) {
    router.push("/round-setup");
  }
};
const startNewGame = () => {
  store.resetGame();
  localStorage.removeItem("game");
  router.push("/game-setup");
};

const bageSeverity = (count) => {
  if (count === 1) {
    return "success";
  }
  if (count === 2) {
    return "warning";
  }
  if (count >= 3) {
    return "danger";
  }
};

onMounted(() => {
  if (
    store.teamOneFullScore > store.fullGame.value ||
    (store.teamTwoFullScore > store.fullGame.value &&
      store.teamOneFullScore !== store.teamTwoFullScore)
  ) {
    store.finishGame();
  }

  if (
    (store.teamOneBaitsCount === 2 || store.teamTwoBaitsCount === 2) &&
    !store.secondBaitMark
  ) {
    store.secondBaitMark = true;
    let audio = new Audio("b2.mp3");
    audio.play();
  }
  if (
    (store.teamOneBaitsCount === 3 || store.teamTwoBaitsCount === 3) &&
    !store.thirdBaitMark
  ) {
    store.thirdBaitMark = true;
    let audio = new Audio("minus100.m4a");
    audio.play();
  }
});

const isWinner = computed(() => {
  const winner =
    store.teamOneFullScore > store.teamTwoFullScore
      ? store.teamOne
      : store.teamTwo;
  return !store.isGameOn && winner;
});

const confirmDialog = () => {
  store.toggleDialog();
  startNewGame();
};
</script>

<template>
  <base-page class="scores-page" page-title="Scores">
    <template #content>
      <div class="total-scores">
        <div class="team-one-score">
          <h1 class="mb-1">{{ store.teamOne }}</h1>
          <Badge
            :value="`B-${store.teamOneBaitsCount}`"
            size="large"
            :severity="bageSeverity(store.teamOneBaitsCount)"
            :class="{ 'opacity-0': store.teamOneBaitsCount === 0 }"
          />
          <div class="score-value">{{ store.teamOneFullScore }}</div>
        </div>
        <div class="team-two-score">
          <h1 class="mb-1">{{ store.teamTwo }}</h1>
          <Badge
            :value="`B-${store.teamTwoBaitsCount}`"
            size="large"
            :severity="bageSeverity(store.teamTwoBaitsCount)"
            :class="{ 'opacity-0': store.teamTwoBaitsCount === 0 }"
          />
          <div class="score-value">
            <span>{{ store.teamTwoFullScore }}</span>
          </div>
        </div>
      </div>
      <div class="table-details">
        <DataTable
          :value="store.gameCountedArr"
          show-gridlines
          breakpoint="250px"
          class="p-datatable-sm"
        >
          <Column field="roundNumber" header="#"></Column>
          <Column field="playedBy.name" header="Played"></Column>
          <Column field="teamOneScore" :header="store.teamOne">
            <template #body="slotProps">
              <div
                :class="{
                  'font-bold':
                    slotProps.data.teamOneScore > slotProps.data.teamTwoScore,
                }"
              >
                <Badge
                  v-if="slotProps.data.hasBait === 'teamOne'"
                  value="Б"
                  size="small"
                  severity="danger"
                />
                <span v-if="!(slotProps.data.hasBait === 'teamOne')">
                  {{ slotProps.data.teamOneScore }}</span
                >
              </div>
            </template>
          </Column>
          <Column field="teamTwoScore" :header="store.teamTwo">
            <template #body="slotProps">
              <div
                :class="{
                  'font-bold':
                    slotProps.data.teamOneScore < slotProps.data.teamTwoScore,
                }"
              >
                <Badge
                  v-if="slotProps.data.hasBait === 'teamTwo'"
                  value="Б"
                  size="small"
                  severity="danger"
                />
                <span v-if="!(slotProps.data.hasBait === 'teamTwo')">
                  {{ slotProps.data.teamTwoScore }}</span
                >
              </div>
            </template>
          </Column>
          <Column field="currentRoundSum" header="Sum"></Column>
          <Column header="Edit" class="text-center">
            <template #body="slotProps">
              <Button
                v-if="slotProps.data.isLatest"
                icon="pi pi-trash"
                class="p-button"
                @click="store.deleteRound(slotProps.data.roundNumber)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
      <div v-if="isWinner" class="winner">
        <h3>Winners</h3>
        <h1>{{ isWinner }}</h1>
      </div>
      <Dialog
        v-model:visible="store.showDialog"
        header="Confirmation"
        :modal="true"
      >
        <div class="confirmation-content">
          <h3>Reset current game?</h3>
        </div>
        <template #footer>
          <Button
            label="No"
            icon="pi pi-times"
            class="p-button-text"
            @click="store.toggleDialog"
          />
          <Button
            label="Yes"
            icon="pi pi-check"
            class="p-button-text"
            autofocus
            @click="confirmDialog"
          />
        </template>
      </Dialog>
    </template>
    <template #actions>
      <div class="button-wrapper">
        <Button
          icon="pi pi-prime"
          class="p-button p-button-lg p-button-secondary w-2rem"
          @click="store.toggleDialog"
        />
        <Button
          :disabled="isWinner"
          label="Continue"
          class="p-button-lg p-button-success"
          @click="continueGame"
        />
      </div>
    </template>
  </base-page>
</template>

<style scoped></style>
