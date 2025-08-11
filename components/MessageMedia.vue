<template>
	<div class="media-container">
		<NuxtImg v-for="link of props.links" class="media-item" :src="link" @click.prevent="createModal(link)" />
	</div>
</template>

<script lang="ts" setup>
import { ModalBase } from '#components';
import { render } from 'vue';


const props = defineProps<{ links: string[] }>();

function createModal(link: string) {
	const div = document.createElement("div");
	const modal = h(ModalBase, {
		obscure: true,
		onClose: () => unrender(div),
		onCancel: () => unrender(div),
	},
	[
		h("img", {
			src: link,
			class: "default-contextmenu"
		})
	]);
	
	document.body.appendChild(div);
	render(modal, div);
}

</script>

<style scoped>

.media-container {
	grid-column: 2;
	grid-row: 3;
	margin-left: .5dvw;
}

.media-item {
	cursor: pointer;
	max-width: 15dvw;
	border-radius: var(--embed-radius);
}

</style>