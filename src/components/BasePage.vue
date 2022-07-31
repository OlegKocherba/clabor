<template>
  <div class="base-page">
    <div v-if="props.pageTitle" class="header">
      <h3>{{ props.pageTitle }}</h3>
      <div class="total-scores-small">
        <div class="team-one-score">
          <h4 class="mb-1">{{ store.teamOne }}</h4>
          <div class="score-value">{{ store.teamOneFullScore }}</div>
        </div>
        <div class="team-two-score">
          <h4 class="mb-1">{{ store.teamTwo }}</h4>
          <div class="score-value">
            <span>{{ store.teamTwoFullScore }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <slot name="content" />
    </div>
    <div class="actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup>
import { useClaborStore } from "../stores/claborState";
const store = useClaborStore();
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
});
</script>
<style scoped></style>
