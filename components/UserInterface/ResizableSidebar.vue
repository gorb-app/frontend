<template>
	<div ref="resizableSidebar" class="resizable-sidebar"
			:style="{
				'width': props.width,
				'min-width': props.minWidth,
				'max-width': props.maxWidth,
				'border': props.borderSides == 'all' ? borderStyling : undefined,
				'border-top': props.borderSides?.includes('top') ? borderStyling : undefined,
				'border-bottom': props.borderSides?.includes('bottom') ? borderStyling : undefined,
			}">
		<div v-if="props.borderSides != 'right'" class="width-resizer-bar">
			<div ref="widthResizer" class="width-resizer"></div>
		</div>
		<div class="sidebar-content">
			<slot />
		</div>
		<div v-if="props.borderSides == 'right'" class="width-resizer-bar">
			<div ref="widthResizer" class="width-resizer"></div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { ContextMenuItem } from '~/types/interfaces';

const props = defineProps<{ width?: string, minWidth: string, maxWidth: string, borderSides: "all" | "top" | "right" | "bottom" | "left" | ("top" | "right" | "bottom" | "left")[], localStorageName?: string }>();

const borderStyling = ".1rem solid var(--padding-color)";

const resizableSidebar = ref<HTMLDivElement>();
const widthResizer = ref<HTMLDivElement>();

const menuItems: ContextMenuItem[] = [
	{ name: "Reset", callback: () => { resizableSidebar.value!.style.width = props.width ?? props.minWidth } }
]

onMounted(() => {
	if (resizableSidebar.value && widthResizer.value) {
		widthResizer.value.addEventListener("pointerdown", (e) => {
			e.preventDefault();
			if (e.button == 2) {
				createContextMenu(e, menuItems);
				return
			};
			document.body.style.cursor = "col-resize";
			function handleMove(pointer: PointerEvent) {
				if (resizableSidebar.value) {
					console.log("moving");
					console.log("pointer:", pointer);
					console.log("width:", resizableSidebar.value.style.width);
					let delta = 0;
					if (props.borderSides == 'right') {
						delta = resizableSidebar.value.getBoundingClientRect().left;
						console.log("delta:", delta);
						resizableSidebar.value.style.width = `${pointer.clientX - delta}px`;
					} else {
						delta = resizableSidebar.value.getBoundingClientRect().right;
						console.log("delta:", delta);
						resizableSidebar.value.style.width = `${delta - pointer.clientX}px`;
					}
				}
			}

			document.addEventListener("pointermove", handleMove);

			document.addEventListener("pointerup", () => {
				console.log("pointer up");
				document.removeEventListener("pointermove", handleMove);
				console.log("removed pointermove event listener");
				document.body.style.cursor = "";
				if (resizableSidebar.value && props.localStorageName) {
					localStorage.setItem(props.localStorageName, resizableSidebar.value.style.width);
				}
			}, { once: true });
		});
	}
});

</script>

<style>
.resizable-sidebar > * {
	box-sizing: border-box;
}

.resizable-sidebar {
	display: flex;
	background: var(--optional-channel-list-background);
	background-color: var(--sidebar-background-color);
	height: 100%;
	flex: 0 0 auto;
}

.width-resizer {
	width: .5rem;
	cursor: col-resize;
	position: absolute;
	height: 100%;
}

.width-resizer-bar {
	display: flex;
	justify-content: center;
	position: relative;
	height: 100%;
	width: 1px;
	background-color: var(--padding-color);
}

.sidebar-content {
	width: 100%;
	padding-left: .25em;
	padding-right: .25em;
}

.sidebar-content > :first-child {
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	overflow-x: hidden;
}
</style>