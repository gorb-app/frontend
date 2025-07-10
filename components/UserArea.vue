<template>
	<div id="user-panel">
		HELLO!!
	</div>
</template>

<script lang="ts" setup>
import type { UserResponse } from '~/types/interfaces';

const props = defineProps<{
	user: UserResponse,
}>();

</script>

<style scoped>
#user-panel {
	width: 100%;
}
</style>