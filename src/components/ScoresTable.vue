<template>
  <base-page class="scores-page" page-title="Scores">
    <template #content>
      <div class="total-scores">
        <div class="team-one-score">
          <h1 class="mb-1">{{ store.teamOne }}</h1>
          <Badge
            :value="`Б ${store.teamOneBaitsCount}`"
            size="large"
            :severity="bageSeverity(store.teamOneBaitsCount)"
            :class="{ 'opacity-0': store.teamOneBaitsCount === 0 }"
          />
          <div class="score-value">{{ store.teamOneFullScore }}</div>
        </div>
        <div class="team-two-score">
          <h1 class="mb-1">{{ store.teamTwo }}</h1>
          <Badge
            :value="`Б ${store.teamTwoBaitsCount}`"
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
          showGridlines
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
          <!--          <Column header="Edit">-->
          <!--            <template #body="slotProps">-->
          <!--              <Button-->
          <!--                icon="pi pi-pencil"-->
          <!--                class="p-button"-->
          <!--                @click="editRound(slotProps.data.roundNumber)"-->
          <!--              />-->
          <!--            </template>-->
          <!--          </Column>-->
        </DataTable>
      </div>
      <div class="winner" v-if="isWinner">
        <h3>Winners</h3>
        <h1>{{ isWinner }}</h1>
      </div>
      <Dialog
        header="Confirmation"
        v-model:visible="store.showDialog"
        :modal="true"
      >
        <div class="confirmation-content">
          <h3>Reset current game?</h3>
        </div>
        <template #footer>
          <Button
            label="No"
            icon="pi pi-times"
            @click="store.toggleDialog"
            class="p-button-text"
          />
          <Button
            label="Yes"
            icon="pi pi-check"
            @click="confirmDialog"
            class="p-button-text"
            autofocus
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

<script>
import { computed, onMounted, ref, reactive } from "vue";

import router from "../router/router";
import BasePage from "./BasePage.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Badge from "primevue/badge";
import Dialog from "primevue/dialog";
import { useClaborStore } from "../stores/claborState";

export default {
  name: "ScoresTable",
  components: {
    BasePage,
    DataTable,
    Column,
    Button,
    Badge,
    Dialog,
  },
  setup() {
    const store = useClaborStore();
    const isEdit = ref(false);
    const currentEdit = reactive({
      roundNumber: 0,
      teamOneScore: 0,
      teamTwoScore: 0,
      currentRoundSum: 0,
    });
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
      if (store.teamOneFullScore > 1001 || store.teamTwoFullScore > 1001) {
        store.finishGame();
      }
    });

    const isWinner = computed(() => {
      const winner =
        store.teamOneFullScore > store.teamTwoFullScore
          ? store.teamOne
          : store.teamTwo;
      return !store.isGameOn && winner;
    });

    const editRound = (roundNumber) => {
      const toEdit = store.game.find(
        (round) => round.roundNumber === roundNumber
      );
      currentEdit.roundNumber = roundNumber;
      currentEdit.teamOneScore = toEdit.teamOneScore;
      currentEdit.teamTwoScore = toEdit.teamTwoScore;
      currentEdit.currentRoundSum = toEdit.currentRoundSum;
      isEdit.value = true;
    };

    const finishEdit = (roundNumber) => {
      store.editGameRound(roundNumber, currentEdit);
      isEdit.value = false;
    };

    const confirmDialog = () => {
      store.toggleDialog();
      startNewGame();
    };

    return {
      store,
      continueGame,
      startNewGame,
      bageSeverity,
      isWinner,
      editRound,
      finishEdit,
      isEdit,
      currentEdit,
      confirmDialog,
    };
  },
};
</script>

<style scoped></style>
