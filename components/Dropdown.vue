<template>
  <div class="dropdown">
    <div v-for="option of props.options" class="dropdown-option">
      <button class="button" :data-value="option.value" @click.prevent="option.callback">{{ option.name }}</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DropdownOption } from '~/types/interfaces';

const props = defineProps<{ options: DropdownOption[] }>();

</script>

<style scoped>

.dropdown {
  position: absolute;
  z-index: 100;
  left: 4dvw;
  bottom: 2dvh;
  background-color: var(--background-color);
  width: 10dvw;
  display: flex;
  flex-direction: column;
}

.dropdown-option {
  border: .09rem solid brown;
}

.button {
  padding-top: .5dvh;
  padding-bottom: .5dvh;
  color: var(--main-text-color);
  background-color: transparent;
  width: 100%;
  border: none;
}

.button:hover {
  background-color: rgb(70, 70, 70);
}

</style>