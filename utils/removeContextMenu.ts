import type { ContextMenuInterface } from "~/types/interfaces";

export default (contextMenu: Ref<ContextMenuInterface>) => {
	console.log("resetting and hiding context menu");
	contextMenu.value = {
		show: false,
		pointerX: 0,
		pointerY: 0,
		items: []
	}
	console.log("hidden context menu");
}
