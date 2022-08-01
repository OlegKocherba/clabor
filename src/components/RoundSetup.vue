<template>
  <base-page
    :page-title="`Deal #${store.currentRoundNumber}`"
    class="round-setup"
  >
    <template #content>
      <!--      <Divider align="left" type="dashed">-->
      <!--        <b>Trump</b>-->
      <!--      </Divider>-->
      <!--      <div class="trump">-->
      <!--        <div class="current-trump" :class="currentRound.trump"></div>-->
      <!--        <SelectButton v-model="currentRound.trump" :options="suits">-->
      <!--        </SelectButton>-->
      <!--      </div>-->
      <Divider align="left" type="dashed">
        <b>Deal play by</b>
      </Divider>
      <div class="played-by">
        <SelectButton
          v-model="currentRound.playedBy"
          :options="teams"
          data-key="value"
        >
          <template #option="slotProps">
            <span>{{ slotProps.option.name }}</span
            ><span></span>
          </template>
        </SelectButton>
      </div>
      <div class="round-data">
        <Divider align="left" type="dashed">
          <b>Deal data</b>
        </Divider>
        <div class="field-checkbox-input">
          <label for="binary">
            <span>Terz</span>
          </label>
          <InputNumber
            v-model="currentRound.terzAmount"
            show-buttons
            button-layout="horizontal"
            type="tel"
            :step="1"
            :min="0"
            :max="6"
            decrement-button-class="p-button-danger"
            increment-button-class="p-button-success"
            increment-button-icon="pi pi-plus"
            decrement-button-icon="pi pi-minus"
          />
        </div>
        <div class="field-checkbox-input">
          <label for="binary">
            <span>Poltina</span>
          </label>
          <InputNumber
            v-model="currentRound.poltinaAmount"
            show-buttons
            type="tel"
            button-layout="horizontal"
            :step="1"
            :min="0"
            :max="4"
            decrement-button-class="p-button-danger"
            increment-button-class="p-button-success"
            increment-button-icon="pi pi-plus"
            decrement-button-icon="pi pi-minus"
          />
        </div>
        <ToggleButton
          v-model="currentRound.bella"
          class="no-bribes-button"
          on-label="Bela"
          off-label="Bela"
          on-icon="pi pi-check"
          off-icon="pi pi-times"
        />
        <Divider align="left" type="dashed">
          <b>Deal points</b>
          {{ totalRoundSum }}
        </Divider>
        <div class="round-scores">
          <div class="round-scores-team">
            <h4>{{ store.teamOne }}</h4>
            <InputNumber
              v-model="currentRound.teamOneScore"
              type="tel"
              placeholder="0"
              :min="0"
              :max="totalRoundSum"
              class="w-5rem"
            />
            <Button
              icon="pi pi-refresh"
              class="p-button-secondary refresh-button"
              @click="updateTeamTwoRoundScore"
            />
            <ToggleButton
              v-model="currentRound.teamOneNoBribes"
              :disabled="currentRound.teamOneScore !== 0"
              class="no-bribes-button"
              on-label="No tricks"
              off-label="No tricks"
              on-icon="pi pi-check"
              off-icon="pi pi-times"
            />
          </div>
          <div class="round-scores-team">
            <h4>{{ store.teamTwo }}</h4>
            <InputNumber
              v-model="currentRound.teamTwoScore"
              type="tel"
              placeholder="0"
              :min="0"
              :max="totalRoundSum"
              class="w-5rem"
            />
            <Button
              icon="pi pi-refresh"
              class="p-button-secondary refresh-button"
              @click="updateTeamOneRoundScore"
            />
            <ToggleButton
              v-model="currentRound.teamTwoNoBribes"
              :disabled="currentRound.teamTwoScore !== 0"
              class="no-bribes-button"
              on-label="No tricks"
              off-label="No tricks"
              on-icon="pi pi-check"
              off-icon="pi pi-times"
            />
          </div>
        </div>
      </div>
    </template>
    <template #actions>
      <div class="button-wrapper">
        <Button
          icon="pi pi-prime"
          class="p-button p-button-lg p-button-secondary w-2rem"
          @click="store.toggleDialog"
        />
        <Button
          :disabled="disableFinishRound"
          label="Record the deal"
          class="p-button-lg p-button-primary"
          @click="finishRound"
        />
      </div>
    </template>
  </base-page>
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

<script setup>
import { ref, reactive, computed } from "vue";
import { useClaborStore } from "../stores/claborState";
import router from "../router/router";
import BasePage from "./BasePage.vue";
import SelectButton from "primevue/selectbutton";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import ToggleButton from "primevue/togglebutton";
import Divider from "primevue/divider";
import Dialog from "primevue/dialog";
const store = useClaborStore();
const teams = ref([
  { value: "teamOne", name: store.teamOne },
  { value: "teamTwo", name: store.teamTwo },
]);

const currentRound = reactive({
  roundNumber: store.currentRoundNumber,
  dealer: "",
  playedBy: null,
  trump: "diamonds",
  terzAmount: 0,
  poltinaAmount: 0,
  bella: false,
  teamOneScore: 0,
  teamTwoScore: 0,
  teamOneNoBribes: false,
  teamTwoNoBribes: false,
});

const totalRoundSum = computed(() => {
  const terz = currentRound.terzAmount ? currentRound.terzAmount * 20 : 0;
  const potina = currentRound.poltinaAmount
    ? currentRound.poltinaAmount * 50
    : 0;
  const bella = currentRound.bella ? 20 : 0;
  return 162 + terz + potina + bella;
});

const updateTeamOneRoundScore = () => {
  currentRound.teamOneScore = totalRoundSum.value - currentRound.teamTwoScore;
};
const updateTeamTwoRoundScore = () => {
  currentRound.teamTwoScore = totalRoundSum.value - currentRound.teamOneScore;
};

const disableFinishRound = computed(() => {
  const isWrongSum =
    currentRound.teamOneScore + currentRound.teamTwoScore !==
    totalRoundSum.value;
  return isWrongSum || !currentRound.playedBy;
});

const isDraw = computed(() => {
  return currentRound.teamOneScore === currentRound.teamTwoScore;
});

const finishRound = () => {
  store.updateFullRoundScore({
    ...currentRound,
    currentRoundSum: totalRoundSum,
    isDraw: isDraw.value,
  });

  const toSave = {
    currentRoundNumber: store.currentRoundNumber,
    isGameOn: store.isGameOn,
    teamOne: store.teamOne,
    teamTwo: store.teamTwo,
    fullGame: store.fullGame,
    game: store.game,
  };
  localStorage.setItem("game", JSON.stringify(toSave));
  router.push("/scores");
};

const startNewGame = () => {
  store.resetGame();
  localStorage.removeItem("game");
  router.push("/game-setup");
};

const confirmDialog = () => {
  store.toggleDialog();
  startNewGame();
};
// const suits = ref(["hearts", "clubs", "diamonds", "spades"]);
</script>

<style scoped></style>
