<template>
	<div class="radio-button-container" ref="radioButtonContainer">
		<span v-for="index in incidies" :key="index"
				class="radio-button" @click="onClick(index)">
			{{ textStrings[index] }}
		</span>
	</div>
</template>

<script lang="ts" setup>

const radioButtonContainer = ref<HTMLDivElement>()

const props = defineProps<{
	textStrings: string[],
	buttonCount: number,
	defaultButtonIndex: number,
	callback: CallableFunction,
}>();

// makes an array from 0 to buttonCount - 1
const incidies = Array.from({ length: props.buttonCount }, (_, i) => i) 

function onClick(clickedIndex: number) {
	// remove selected-radio-button class from all buttons except the clicked one	
	if (radioButtonContainer.value) {
		const children = radioButtonContainer.value.children
		for (let i = 0; i < children.length; i++) {
			children.item(i)?.classList.remove("selected-radio-button")
		}

		children.item(clickedIndex)?.classList.add("selected-radio-button")
	}
	
	props.callback(clickedIndex)
}
</script>

<style scoped>
.radio-button-container {
	display: flex;
	flex-direction: column;
}

.radio-button {
	cursor: pointer;

	border-radius: 1em;
	background-color: unset;
	color: var(--text-color);

	padding: 0.4em 0.75em;
	margin: 0.4em 0em;
	font-size: 1.1em;
	transition: background-color 0.2s;
}

.radio-button:hover {
	background-color: var(--secondary-highlighted-color);
}

.selected-radio-button {
	background-color: var(--primary-color);
}

.selected-radio-button:hover {
	background-color: var(--primary-highlighted-color);
}

</style>