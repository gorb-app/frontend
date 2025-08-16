<template>
	<div id="error-container">
		<h2>{{ error?.statusCode }}</h2>
		<p>{{ error?.message }}</p>
	</div>
</template>

<script lang="ts" setup>
import type { NuxtError } from '#app';

const props = defineProps({
	error: Object as () => NuxtError
});

if (props.error?.statusCode == 401) {
	console.log("HELLO THERE");
	clearError({ redirect: `/login?redirect_to=${useRoute().fullPath}` });
}

</script>

<style scoped>

#error-container {
	text-align: center;
	margin: auto;
}

</style>
