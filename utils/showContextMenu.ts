import { render } from "vue";
import ContextMenu from "~/components/UserInterface/ContextMenu.vue";
import type { ContextMenuInterface, ContextMenuItem } from "~/types/interfaces";

export default (e: MouseEvent | PointerEvent, contextMenu: ContextMenuInterface, menuItems: ContextMenuItem[]) => {
  console.log("Showing context menu");
  contextMenu.show = true;
  contextMenu.pointerX = e.clientX;
  contextMenu.pointerY = e.clientY;
  contextMenu.items = menuItems;
  console.log("Showed");
}
