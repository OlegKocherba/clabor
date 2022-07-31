<template>
  <div class="base-player">
    <div class="name">{{ name }}</div>
    <div class="user-actions">
      <Button
        icon="pi pi-trash"
        class="p-button-danger"
        @click="deletePlayer"
      />
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";
export default {
  components: {
    Button,
  },
  name: "BasePlayer",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  emits: {
    edit: {
      type: String,
    },
    delete: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const editPlayer = () => {
      emit("edit", props.name);
    };
    const deletePlayer = () => {
      emit("delete", props.name);
    };
    return {
      editPlayer,
      deletePlayer,
    };
  },
};
</script>

<style scoped></style>
