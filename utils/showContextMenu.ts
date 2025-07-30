import { render } from "vue";
import ContextMenu from "~/components/UserInterface/ContextMenu.vue";
import type { ContextMenuInterface, ContextMenuItem } from "~/types/interfaces";

export default (e: MouseEvent, contextMenu: ContextMenuInterface, menuItems: ContextMenuItem[]) => {
  console.log("Showing context menu");
  contextMenu.show = true;
  contextMenu.cursorX = e.clientX;
  contextMenu.cursorY = e.clientY;
  contextMenu.items = menuItems;
  console.log("Showed");
}
