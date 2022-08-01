import { defineStore } from "pinia";

export const useClaborStore = defineStore({
  id: "state",
  state: () => ({
    showPlayersList: false,
    showDialog: false,
    playersList: [
      { name: "Oleg", team: "", value: "Oleg" },
      { name: "Ivan", team: "", value: "Ivan" },
      { name: "Tolik", team: "", value: "Tolik" },
      { name: "Sergey", team: "", value: "Sergey" },
    ],
    currentRoundNumber: 1,
    isGameOn: true,
    teamOne: "We",
    teamTwo: "They",
    drawScores: "",
    fullGame: 1001,
    game: [],
  }),
  getters: {
    teamOneList(state) {
      return state.playersList.filter((item) => item.team === "teamOne");
    },
    teamTwoList(state) {
      return state.playersList.filter((item) => item.team === "teamTwo");
    },
    teamOneFullScore(state) {
      const fullScore = state.game.reduce((acc, el) => {
        return acc + el.teamOneScore;
      }, 0);
      if (this.teamOneBaitsCount >= 3 && this.teamOneBaitsCount < 6) {
        return fullScore - 100;
      }
      if (this.teamOneBaitsCount >= 6) {
        return fullScore - 200;
      }
      return fullScore;
    },
    teamTwoFullScore(state) {
      const fullScore = state.game.reduce((acc, el) => {
        return acc + el.teamTwoScore;
      }, 0);
      if (this.teamTwoBaitsCount >= 3 && this.teamTwoBaitsCount < 6) {
        return fullScore - 100;
      }
      if (this.teamTwoBaitsCount >= 6) {
        return fullScore - 200;
      }
      return fullScore;
    },
    teamOneBaitsCount() {
      return this.gameCountedArr.reduce((acc, item) => {
        return item.hasBait === "teamOne" ? acc + 1 : acc;
      }, 0);
    },
    teamTwoBaitsCount() {
      return this.gameCountedArr.reduce((acc, item) => {
        acc = item.hasBait === "teamTwo" ? acc + 1 : acc;
        return acc;
      }, 0);
    },
    gameCountedArr(state) {
      return state.game.map((item, idx, arr) => {
        let hasBait = "";

        if (item.isDraw) {
          item.teamTwoScore = 0;
          item.teamOneScore = 0;
        } else if (item.teamOneScore > item.teamTwoScore) {
          hasBait = item.playedBy.value === "teamOne" ? "" : "teamTwo";
        } else {
          hasBait = item.playedBy.value === "teamTwo" ? "" : "teamOne";
        }

        if (hasBait === "teamOne") {
          item.teamOneScore = 0;
          item.teamTwoScore = item.currentRoundSum;
        }
        if (hasBait === "teamTwo") {
          item.teamOneScore = item.currentRoundSum;
          item.teamTwoScore = 0;
        }
        if (idx > 0 && arr[idx - 1].isDraw) {
          if (hasBait === "teamOne") {
            item.teamOneScore = 0;
            item.teamTwoScore =
              arr[idx - 1].currentRoundSum + item.currentRoundSum;
          }
          if (hasBait.value === "teamTwo") {
            item.teamOneScore =
              arr[idx - 1].currentRoundSum + item.currentRoundSum;
            item.teamTwoScore = 0;
          }
          if (!hasBait) {
            item.teamOneScore = item.teamOneScore + item.currentRoundSum / 2;
            item.teamTwoScore = item.teamTwoScore + item.currentRoundSum / 2;
          }
        }

        if (item.teamOneNoBribes && item.teamOneScore === 0) {
          item.teamOneScore = -100;
        }
        if (item.teamTwoNoBribes && item.teamTwoScore === 0) {
          item.teamTwoScore = -100;
        }

        return { ...item, hasBait };
      });
    },
  },
  actions: {
    togglePlayersList() {
      this.showPlayersList = !this.showPlayersList;
    },
    toggleDialog() {
      this.showDialog = !this.showDialog;
    },
    addPlayer(name) {
      this.playersList.push({ name, team: "", value: name });
    },
    deletePlayer(name) {
      this.playersList = this.playersList.filter((item) => item.name !== name);
    },

    updateFullRoundScore(roundData) {
      this.game.push(roundData);
      this.currentRoundNumber++;
    },
    editGameRound({ currentEdit }) {
      this.game = this.game.map((round) => {
        return round.roundNumber === currentEdit.roundNumber
          ? { ...round, ...currentEdit }
          : round;
      });
    },
    resetGame() {
      this.game = [];
      this.currentRoundNumber = 1;
      this.isGameOn = true;
    },
    finishGame() {
      this.isGameOn = false;
    },
    updateTeam({ name, team }) {
      if (team) {
        //add to team
        this.playersList.map((el) => (el.name === name ? { ...el, team } : el));
      } else {
        //remove from
        this.playersList.map((el) =>
          el.name === name ? { ...el, team: "" } : el
        );
      }
    },
    updatePlayersList(e, team) {
      return this.playersList.map((el) => {
        const inList = e.value.some((item) => {
          return item.value === el.value;
        });
        return inList ? { ...el, team: team } : el;
      });
    },
  },
});
