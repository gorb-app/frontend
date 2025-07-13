import { render } from "vue";
import ContextMenu from "~/components/UserInterface/ContextMenu.vue";
import type { ContextMenuItem } from "~/types/interfaces";

export default (e: MouseEvent, menuItems: ContextMenuItem[]) => {
  console.log("Rendering new context menu");
  const menuContainer = document.createElement("div");
  menuContainer.id = "context-menu";
  document.body.appendChild(menuContainer);
  const contextMenu = h(ContextMenu, {
  	menuItems,
  	cursorX: e.clientX,
  	cursorY: e.clientY 
  });
  render(contextMenu, menuContainer);
  console.log("Rendered");
}
