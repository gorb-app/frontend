<template>
  	<div>
		<Banner v-if="banner" />
		<ContextMenu v-if="contextMenu && contextMenu.show" :pointer-x="contextMenu.pointerX" :pointer-y="contextMenu.pointerY" :menu-sections="contextMenu.sections" />
    	<NuxtPage :keepalive="true" />
  	</div>
</template>

<script lang="ts" setup>
import ContextMenu from '~/components/UserInterface/ContextMenu.vue';
import type { ContextMenuInterface } from './types/interfaces';

const banner = useState("banner", () => false);

const contextMenu = useState<ContextMenuInterface>("contextMenu", () => ({ show: false, pointerX: 0, pointerY: 0, sections: [] }));

onMounted(() => {
	loadPreferredThemes()

	document.addEventListener("pointerdown", (e) => {
		if (e.target instanceof HTMLElement && e.target.classList.contains("context-menu-item")) return;
		console.log("click");
		console.log("target:", e.target);
		console.log(e.target instanceof HTMLDivElement);
		if (contextMenu.value.show) {
			console.log("context menu is shown, hiding");
			removeContextMenu(contextMenu);
		}
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
			const replyToMessage = document.querySelector(`.message[data-message-id='${messageReply.dataset.messageId}']`);
			if (replyToMessage) {
				replyToMessage.classList.remove("replying-to");
			}
		}
	});
});

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
