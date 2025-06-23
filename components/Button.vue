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

	background-color: #b35719;
	color: #ffffff;

	padding: 8px 18px;
	font-size: 18px;
	transition: background-color 0.2s;

	border-radius: 12px;
	text-decoration: none;
	display: inline-block;
}

.scary-button {
	background-color: red;
}

.neutral-button {
	background-color: grey;
}

#button:hover {
	background-color: #934410;
}
</style>