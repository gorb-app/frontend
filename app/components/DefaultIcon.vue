<template>
  <div :style="`background-color: ${generateIrcColor(seed, 50)}`"
	class="default-icon">
		<div class="default-icon-text-container">
			<span class="default-icon-text">
				{{ previewName }}
			</span>
		</div>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
	seed: string,
	name: string
}>();

let previewName = "";
// include the entire name if it's 3 chars or less, use the first char of the first 3 words otherwise
if (props.name.length > 3) {
	let splitName: string[] = props.name.split(' ')
	for (let i = 0; i < 3; i ++) {
		if (splitName[i]) {
			previewName += splitName[i].charAt(0)
		} else {
			break
		}
	}
} else {
	previewName = props.name
}

</script>

<style scoped>
.default-icon, .default-icon-text-container {
	display: flex;
	align-items: center;
	justify-content: center;
}

.default-icon-text-container {
	height: 100%;
	width: 100%;
}

.default-icon-text {
	/* helps centre the icon, yes, this is NOT perfect */
	margin-top: -0.15em;

	font-weight: bold;

	color: var(--text-color)
}
</style>
