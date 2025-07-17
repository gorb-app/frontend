<template>
	<button class="button" :class="props.variant + '-button'"
	@click="props.callback ? props.callback() : null">
			{{ props.text }}
	</button>
</template>

<script lang="ts" setup>

const props = defineProps<{
	text: string,
	callback?: CallableFunction,
	variant?: "normal" | "scary" | "neutral" | "stealth",
}>();

</script>

<style scoped>
.button {
	cursor: pointer;

	background-color: var(--primary-color);
	color: var(--text-color);

	padding: 0.4em 0.75em;
	font-size: 1.1em;
	transition: background-color 0.2s;

	border-radius: 0.7rem;
	text-decoration: none;
	display: inline-block;

	border: none;
}

.button:hover {
	background-color: var(--primary-highlighted-color);
}

.scary-button {
	background-color: red;
}
.scary-button:hover {
	background-color: red;
}

.neutral-button {
	background-color: var(--accent-color);
}
.neutral-button:hover {
	background-color: var(--accent-highlighted-color);
}

.stealth-button {
	background-color: unset;
}
.stealth-button:hover {
	background-color: unset;
}

</style>