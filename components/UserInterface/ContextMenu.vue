<template>
	<div v-for="item of props.menuItems" class="context-menu-item" @click="runCallback(item)">
		{{ item.name }}
	</div>
</template>

<script lang="ts" setup>
import type { ContextMenuItem } from '~/types/interfaces';

const props = defineProps<{ menuItems: ContextMenuItem[], pointerX: number, pointerY: number }>();

onMounted(() => {
	const contextMenu = document.getElementById("context-menu");
	if (contextMenu) {
		contextMenu.style.left = props.pointerX.toString() + "px";
		contextMenu.style.top = props.pointerY.toString() + "px";
	}
});


function runCallback(item: ContextMenuItem) {
	removeContextMenu();
	item.callback();
}

</script>

<style>

#context-menu {
	position: absolute;
	display: flex;
	flex-direction: column;
	width: 10dvw;
	border: .15rem solid cyan;
	background-color: var(--background-color);
	text-align: center;
}

.context-menu-item:hover {
	background-color: rgb(50, 50, 50);
}

</style>