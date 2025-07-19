<template>
  <div :style="`background-color: ${generateIrcColor(seed, 50)}`"
	class="default-icon">
		<span class="default-icon-text">
			{{ previewName }}
		</span>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
	seed: string,
	name: string	
}>();

let previewName = "";
if (props.name.length > 3) {
	let guildName: string[] = props.name.split(' ')
	for (let i = 0; i < 3; i ++) {
		if (guildName.length > i) {
			previewName += guildName[i].charAt(0)
		} else {
			break
		}
	}
} else {
	previewName = props.name
}

</script>

<style scoped>
.default-icon {
	display: flex;
	align-items: center;
	justify-content: center;
}

.default-icon-text {
	/* helps centre the icon, yes, this is NOT perfect */
	margin-top: -0.15em;

	font-weight: bold;

	color: var(--secondary-text-color)
}
</style>
