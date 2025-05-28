<template>
	<div id="container">
		<div v-if="errorMessage">
			{{ errorMessage }}
		</div>
	</div>
</template>

<script lang="ts" setup>

const errorMessage = ref();

const token = useRoute().query.token;

try {
	const res = await fetchWithApi("/auth/verify-email", { query: { token } });
	console.log("hi");
} catch (error) {
	console.error("Error verifying email:", error);
	errorMessage.value = error;
}

</script>

<style scoped>

#container {
	text-align: center;
	margin: auto;
}

</style>