<template>
	<div class="radio-buttons-container" ref="radioButtonsContainer">
		<div v-for="(textString, index) in props.textStrings"
				class="radio-button"
				@click="onClick(index)">
			<span class="radio-button-radio"></span>
			<span class="radio-button-text">{{ textString }}</span>
		</div>
	</div>
</template>

<script lang="ts" setup>

const radioButtonsContainer = ref<HTMLDivElement>()

const props = defineProps<{
	textStrings: string[],
	defaultButtonKey?: string,
	defaultButtonIndex?: number,
	callback: CallableFunction,
}>();

onMounted(async () => {
	await nextTick()
	
	// select default selected button
	if (radioButtonsContainer.value) {
		const children = radioButtonsContainer.value.children

		// set the button based on key
		if (props.defaultButtonKey) {
			const newIndex = props.textStrings.indexOf(props.defaultButtonKey)
			const defaultButton = children.item(newIndex)
			if (defaultButton) {
				selectButton(defaultButton)
				return // note the return if you're extending this
			}
		}
		// if that fails, set it based on index, defaulting to 0
		const defaultButton = children.item(props.defaultButtonIndex ?? 0)
		if (defaultButton) {
			selectButton(defaultButton)
		}
	}
})


function onClick(clickedIndex: number) {
	if (radioButtonsContainer.value) {
		// remove selected-radio-button class from all buttons except the clicked one	
		const children = radioButtonsContainer.value.children
		for (const button of children) {
			if (button) {
				unselectButton(button)
			}
		}

		const button = children.item(clickedIndex)
		if (button) {
			selectButton(button)
		}
	}
	
	props.callback(clickedIndex)
}

function unselectButton(button: Element) {
	button.classList.remove("selected-radio-button")
	button.children.item(0)?.classList.remove("selected-radio-button-radio")	
}

function selectButton(button: Element) {
	button.classList.add("selected-radio-button")
	button.children.item(0)?.classList.add("selected-radio-button-radio")
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