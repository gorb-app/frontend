<template>
	<div ref="mediaContainer" class="media-container">
		<NuxtImg v-for="link of props.links" class="media-item" :src="link" @click.prevent="createModal(link)" @load="imagesLoaded++" />
	</div>
</template>

<script lang="ts" setup>
import { ModalBase } from '#components';
import { render } from 'vue';


const props = defineProps<{ links: string[] }>();

const mediaContainer = ref<HTMLDivElement>();

const imagesLoaded = ref(0);

watch(imagesLoaded, () => {
	if (imagesLoaded.value < props.links.length) return;
	const messageDataContainer = mediaContainer.value?.closest(".message-data");
	const messagesContainer = document.getElementById("messages");
	if (messageDataContainer && messagesContainer && mediaContainer.value) {
		const mediaRect = messageDataContainer.getBoundingClientRect();
		const messagesRect = messagesContainer.getBoundingClientRect();
		if (mediaRect.right > messagesRect.right) {
			mediaContainer.value.style.flexDirection = "column";
		}
	}
});

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
	display: flex;
	grid-column: 2;
	grid-row: 3;
	gap: .2rem;
}

.grouped-message .media-container {
	display: flex;
	grid-column: 2;
	grid-row: 2;
}

.media-item {
	cursor: pointer;
	max-width: 15dvw;
}

</style>