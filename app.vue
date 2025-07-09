<template>
  <div>
    <Banner v-if="banner" />
    <NuxtPage :keepalive="true" />
  </div>
</template>

<script lang="ts" setup>
import { ContextMenu } from '#components';
import { render } from 'vue';

const banner = useState("banner", () => false);

onMounted(() => {
	document.removeEventListener("contextmenu", contextMenuHandler);
	document.addEventListener("contextmenu", (e) => {
		contextMenuHandler(e);
	});
	document.addEventListener("mousedown", (e) => {
		console.log("click");
		console.log("target:", e.target);
		console.log(e.target instanceof HTMLDivElement);
		if (e.target instanceof HTMLDivElement) {
			const classes = e.target.classList;
			console.log(classes);
			if (classes.contains("message-data") || classes.contains("message-metadata") || classes.contains("message-text")) {
				const closest = e.target.closest("div.message") as HTMLDivElement;
				console.log("message ID:", closest.dataset.messageId);
			}
		}
		const contextMenu = document.getElementById("context-menu");
		if (contextMenu) {
			contextMenu.remove();
		}
	});
});

function contextMenuHandler(e: MouseEvent) {
	e.preventDefault();
	console.log("Opened context menu");
	console.log("Rendering new context menu");
	const menuContainer = document.createElement("div");
	menuContainer.id = "context-menu";
	document.body.appendChild(menuContainer);
	const contextMenu = h(ContextMenu, { cursorX: e.clientX, cursorY: e.clientY });
	render(contextMenu, menuContainer);
	console.log("Rendered");
}

</script>

<style>
:root {
  --background-color: rgb(30, 30, 30);
  --main-text-color: rgb(190, 190, 190);
  --outline-border: 1px solid rgb(150, 150, 150);
}

html,
body {
  font-family: Arial, Helvetica, sans-serif;
  box-sizing: border-box;
  color: rgb(190, 190, 190);
  background-color: rgb(30, 30, 30);
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
	border-bottom: 1px solid rgb(70, 70, 70);
}

.left-border {
	border-left: 1px solid rgb(70, 70, 70);
}

.right-border {
	border-right: 1px solid rgb(70, 70, 70);
}

.rounded-corners {
  border-radius: .3rem;
}


.invisible {
	visibility: hidden;
}

</style>
