<template>
	<div id="context-menu">
		<button v-for="item of props.menuItems" class="context-menu-item" @click="runCallback(item)">
			{{ item.name }} <Icon v-if="item.icon" :name="item.icon" />
		</button>
	</div>
</template>

<script lang="ts" setup>
import type { ContextMenuInterface, ContextMenuItem } from '~/types/interfaces';

const props = defineProps<{ menuItems: ContextMenuItem[], cursorX: number, cursorY: number }>();

onMounted(() => {
	const contextMenu = document.getElementById("context-menu");
	if (contextMenu) {
		contextMenu.style.left = props.cursorX.toString() + "px";
		contextMenu.style.top = props.cursorY.toString() + "px";
	}
});


function runCallback(item: ContextMenuItem) {
	const contextMenu = useState<ContextMenuInterface>("contextMenu");
	removeContextMenu(contextMenu);
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