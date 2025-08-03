<template>
	<div id="context-menu">
		<button v-for="item of props.menuItems" class="context-menu-item"
				:class="'context-menu-item-' + item.type"
				@click="runCallback(item)">
			{{ item.name }} <Icon v-if="item.icon" :name="item.icon" />
		</button>
	</div>
</template>

<script lang="ts" setup>
import type { ContextMenuInterface, ContextMenuItem } from '~/types/interfaces';

const props = defineProps<{ menuItems: ContextMenuItem[], pointerX: number, pointerY: number }>();

onMounted(() => {
	const contextMenu = document.getElementById("context-menu");
	if (contextMenu) {
		contextMenu.style.left = props.pointerX.toString() + "px";
		contextMenu.style.top = props.pointerY.toString() + "px";
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
	width: 10rem;
	border: .1rem solid var(--reply-text-color);
	background-color: var(--sidebar-highlighted-background-color);
	text-align: left;
	z-index: 100;
}

.context-menu-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 2rem;
	width: 100%;
	color: var(--text-color);
	background-color: var(--sidebar-highlighted-background-color);
	border: none;
	text-align: left;
	padding-left: 1rem;
	padding-right: 1rem;
}

.context-menu-item:hover {
	background-color: rgb(50, 50, 50);
}

.context-menu-item-danger {
	color: var(--danger-text-color);
}

</style>