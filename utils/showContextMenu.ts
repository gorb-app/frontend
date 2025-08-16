import { render } from "vue";
import ContextMenu from "~/components/UserInterface/ContextMenu.vue";
import type { ContextMenuInterface, ContextMenuItem, ContextMenuSection } from "~/types/interfaces";

export default (e: MouseEvent | PointerEvent, sections: ContextMenuSection[]) => {
	e.preventDefault();
	e.stopPropagation();
	const contextMenu = useState<ContextMenuInterface>("contextMenu");
	console.log("Menu sections:", sections);
	if (sections.length) {
		console.log("Showing context menu");
		contextMenu.value.show = true;
		contextMenu.value.pointerX = e.clientX;
		contextMenu.value.pointerY = e.clientY;
		contextMenu.value.sections = sections;
		console.log("Showed");
	}
}
