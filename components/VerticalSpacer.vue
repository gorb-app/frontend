<template>
  <span class="spacer"></span>
</template>

<script lang="ts" setup>
import type { UserResponse } from '~/types/interfaces';

const props = defineProps<{
	user: UserResponse,
}>();

</script>

<style scoped>
.spacer {
  height: 0.2dvh;
  display: block;
  margin: 0.8dvh 0.2dvw;
  background-color: var(--padding-color);
}
</style>
