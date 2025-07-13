<template>
  <div class="dropdown-body">
    <div v-for="option of props.options" class="dropdown-option">
      <button class="dropdown-button" :data-value="option.value" @click.prevent="option.callback" tabindex="0">{{ option.name }}</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DropdownOption } from '~/types/interfaces';

const props = defineProps<{ options: DropdownOption[] }>();

</script>

<style scoped>

.dropdown-body {
  position: absolute;
  z-index: 100;
  left: 4dvw;
  bottom: 4dvh;
  background-color: var(--chat-background-color);
  width: 8rem;
  display: flex;
  flex-direction: column;
}

.dropdown-option {
  border: .09rem solid rgb(70, 70, 70);
}

.dropdown-button {
  padding-top: .5dvh;
  padding-bottom: .5dvh;
  color: var(--text-color);
  background-color: transparent;
  width: 100%;
  border: none;
}

.dropdown-button:hover {
  background-color: var(--padding-color);
}

</style>