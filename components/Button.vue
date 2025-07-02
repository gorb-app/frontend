<template>
	<div @click="props.callback()" class="button" :class="props.variant + '-button'">
		{{ props.text }}
	</div>
</template>

<script lang="ts" setup>

const props = defineProps<{
	text: string,
	callback: CallableFunction,
	variant?: "normal" | "scary" | "neutral",
}>();

</script>

<style scoped>
.button {
	cursor: pointer;

	background-color: var(--primary-color);
	color: var(--text-color);

	padding: 0.7dvh 1.2dvw;
	font-size: 1.1em;
	transition: background-color 0.2s;

	border-radius: 0.7rem;
	text-decoration: none;
	display: inline-block;
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

</style>