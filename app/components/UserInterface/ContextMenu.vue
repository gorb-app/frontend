<template>
	<div id="context-menu">
		<template v-for="(section, index) of props.menuSections">
			<div class="context-menu-section">
				<button v-for="item of section.items" class="context-menu-item"
						:class="'context-menu-item-' + item.type"
						@click="runCallback(item)">
					{{ item.name }} <Icon v-if="item.icon" :name="item.icon" />
				</button>
			</div>
			<VerticalSpacer v-if="index < props.menuSections.length - 1" class="context-menu-section-spacer" />
		</template>
	</div>
</template>

<script lang="ts" setup>
import type { ContextMenuInterface, ContextMenuItem, ContextMenuSection } from '~/types/interfaces';
import VerticalSpacer from './VerticalSpacer.vue';

const props = defineProps<{ menuSections: ContextMenuSection[], pointerX: number, pointerY: number }>();

onMounted(() => {
	const contextMenu = document.getElementById("context-menu");
	if (contextMenu) {
		contextMenu.style.left = props.pointerX.toString() + "px";
		contextMenu.style.top = props.pointerY.toString() + "px";
		const rect = contextMenu.getBoundingClientRect();
		if (rect.right > (window.innerWidth || document.documentElement.clientWidth)) {
			contextMenu.style.left = (props.pointerX - contextMenu.clientWidth).toString() + "px";
		}
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
	border: .1rem solid var(--padding-color);
	background-color: var(--popup-background-color);
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
	background-color: var(--popup-background-color);
	border: none;
	text-align: left;
	padding-left: 1rem;
	padding-right: 1rem;
}

.context-menu-item:hover {
	background-color: var(--popup-highlighted-background-color);
}

.context-menu-item-danger {
	color: var(--danger-text-color);
}

.context-menu-section-spacer {
	margin: 0 !important;
}

</style>