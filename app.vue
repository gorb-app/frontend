<template>
  	<div>
		<Banner v-if="banner" />
		<ContextMenu v-if="contextMenu && contextMenu.show" :cursor-x="contextMenu.cursorX" :cursor-y="contextMenu.cursorY" :menu-items="contextMenu.items" />
    	<NuxtPage :keepalive="true" />
  	</div>
</template>

<script lang="ts" setup>
import ContextMenu from '~/components/UserInterface/ContextMenu.vue';
import { render } from 'vue';
import type { ContextMenuInterface } from './types/interfaces';
import loadPreferredTheme from '~/utils/loadPreferredTheme';

const banner = useState("banner", () => false);

const contextMenu = useState<ContextMenuInterface>("contextMenu");

onMounted(() => {
	loadPreferredTheme()

	document.removeEventListener("contextmenu", contextMenuHandler);
	document.addEventListener("contextmenu", (e) => {
		if (e.target instanceof Element && e.target.classList.contains("default-contextmenu")) return;
		contextMenuHandler(e);
	});
	document.addEventListener("mousedown", (e) => {
		if (e.target instanceof HTMLElement && e.target.closest("#context-menu")) return;
		console.log("click");
		console.log("target:", e.target);
		console.log(e.target instanceof HTMLDivElement);
		removeContextMenu(contextMenu);
		if (e.target instanceof HTMLElement && e.target.classList.contains("message-text") && e.target.contentEditable) {
			e.target.contentEditable = "false";
		}
		const destroyOnClick = document.getElementsByClassName("destroy-on-click");
		for (const element of destroyOnClick) {
			const closest = (e.target as HTMLElement).closest(".destroy-on-click");
			if (element != closest) {
				unrender(element);
			}
		}
	});
	document.addEventListener("keyup", (e) => {
		const messageReply = document.getElementById("message-reply") as HTMLDivElement;
		if (e.key == "Escape" && messageReply) {
			e.preventDefault();
			messageReply.remove();
		}
	});
});

function contextMenuHandler(e: MouseEvent) {
	e.preventDefault();
	//console.log("Opened context menu");
	//createContextMenu(e, [
	//	{ name: "Wah", callback: () => { return } }
	//]);
}

</script>

<style>
html {
	background-color: #1f1e1d;
}

body {
  font-family: var(--preferred-font), Arial, Helvetica, sans-serif;
  box-sizing: border-box;
  color: var(--text-color);
	background: var(--optional-body-background);
  background-color: var(--chat-background-color);
  margin: 0;
}

*:focus-visible {
	outline: var(--outline-border);
}

a {
  color: aquamarine;
}

.white {
	color: white;
}

.bottom-border {
	border-bottom: 1px solid var(--padding-color);
}

.left-border {
	border-left: 1px solid var(--padding-color);
}

.right-border {
	border-right: 1px solid var(--padding-color);
}

.rounded-corners {
  border-radius: .3rem;
}


.invisible {
	visibility: hidden;
}

</style>
