<template>
  <div class="modal-top-container">
    <div v-if="heavy" class="modal-container modal-heavy">
    </div>
    <div v-else class="modal-container modal-light">
    </div>
    <div class="modal-div">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps<{ heavy?: boolean }>();

</script>

<style>

.modal-container {
  position: fixed;
  border: 1px solid cyan;
  height: 100%;
  width: 100%;
  opacity: 70%;
  z-index: 10;
  background-color: var(--background-color);
}

.modal-div {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(50, 50, 50);
  opacity: 100%;
  z-index: 11;
  padding: 1%;
}

.modal-top-container {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

</style>