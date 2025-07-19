import { render } from "vue";
import ContextMenu from "~/components/UserInterface/ContextMenu.vue";
import type { ContextMenuItem } from "~/types/interfaces";

export default (e: PointerEvent | MouseEvent, menuItems: ContextMenuItem[]) => {
  console.log("Rendering new context menu");
  const menuContainer = document.createElement("div");
  console.log("hello");
  menuContainer.id = "context-menu";
  document.body.appendChild(menuContainer);
  console.log("pointer x:", e.clientX);
  console.log("pointer y:", e.clientY);
  console.log("menu items:", menuItems);
  const contextMenu = h(ContextMenu, {
  	menuItems,
  	pointerX: e.clientX,
  	pointerY: e.clientY 
  });
  render(contextMenu, menuContainer);
  console.log("Rendered");
}
