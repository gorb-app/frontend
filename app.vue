<template>
  <div>
    <Banner v-if="banner" />
    <NuxtPage :keepalive="true" />
  </div>
</template>

<script lang="ts" setup>
import ContextMenu from '~/components/ContextMenu.vue';
import { render } from 'vue';

const banner = useState("banner", () => false);

onMounted(() => {
	document.removeEventListener("contextmenu", contextMenuHandler);
	document.addEventListener("contextmenu", (e) => {
		contextMenuHandler(e);
	});
	document.addEventListener("mousedown", (e) => {
		if (e.target instanceof HTMLDivElement && e.target.closest("#context-menu")) return;
		console.log("click");
		console.log("target:", e.target);
		console.log(e.target instanceof HTMLDivElement);
		removeContextMenu();
		if (e.target instanceof HTMLElement && e.target.classList.contains("message-text") && e.target.contentEditable) {
			e.target.contentEditable = "false";
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
