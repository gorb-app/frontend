<template>
	<div class="radio-buttons-container" ref="radioButtonsContainer">
		<div v-for="index in indices" :key="index" class="radio-button" @click="onClick(index)">
			<span class="radio-button-radio"></span>
			<span class="radio-button-text">{{ textStrings[index] }}</span>
		</div>
	</div>
</template>

<script lang="ts" setup>

const radioButtonsContainer = ref<HTMLDivElement>()

const props = defineProps<{
	textStrings: string[],
	buttonCount: number,
	defaultButtonIndex: number,
	callback: CallableFunction,
}>();

// makes an array from 0 to buttonCount - 1
const indices = Array.from({ length: props.buttonCount }, (_, i) => i) 

// select default selected button
onMounted(async () => {
	await nextTick()
	
	if (props.defaultButtonIndex != undefined && radioButtonsContainer.value) {
		const children = radioButtonsContainer.value.children
		const defaultButton = children.item(props.defaultButtonIndex)
		defaultButton?.classList.add("selected-radio-button")
		defaultButton?.children.item(0)?.classList.add("selected-radio-button-radio")
	}
})


function onClick(clickedIndex: number) {
	// remove selected-radio-button class from all buttons except the clicked one	
	if (radioButtonsContainer.value) {
		const children = radioButtonsContainer.value.children
		for (let i = 0; i < children.length; i++) {
			children.item(i)?.classList.remove("selected-radio-button")
			children.item(i)?.children.item(0)?.classList.remove("selected-radio-button-radio")
		}

		children.item(clickedIndex)?.classList.add("selected-radio-button")
		children.item(clickedIndex)?.children.item(0)?.classList.add("selected-radio-button-radio")
	}
	
	props.callback(clickedIndex)
}
</script>

<style scoped>
.radio-buttons-container {
	display: flex;
	flex-direction: column;
}

.radio-button {
	cursor: pointer;

	display: flex;
	align-items: center;

	border-radius: .66em;
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
	background-color: var(--accent-color);
}

.selected-radio-button:hover {
	background-color: var(--accent-highlighted-color);
}

.radio-button-radio, .selected-radio-button-radio {
	position: relative;
	
	display: inline-block;
	border-radius: 1em;
}

.radio-button-radio {
	height: 1em;
	width: 1em;
	border: .15em solid var(--primary-color);
}

.selected-radio-button-radio {
    height: 1em;
    width: 1em;
	border: 0.15em solid var(--primary-color);
	background-color: var(--primary-highlighted-color);
}

.radio-button-text {
	margin-left: .5em;
}
</style>