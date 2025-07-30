import type { ContextMenuInterface } from "~/types/interfaces";

export default (contextMenu: Ref<ContextMenuInterface>) => {
	console.log("resetting and hiding context menu");
	contextMenu.value = {
		show: false,
		cursorX: 0,
		cursorY: 0,
		items: []
	}
	console.log("hidden context menu");
}
