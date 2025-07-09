<template>
	<div v-for="item of menuItems" class="context-menu-item">
		{{ item.name }}
	</div>
</template>

<script lang="ts" setup>
const props = defineProps<{ cursorX: number, cursorY: number }>();



const menuItems = [
	{ name: "Edit", callback: editMessage },
	{ name: "Reply", callback: replyMessage }
];

onMounted(() => {
	const contextMenu = document.getElementById("context-menu");
	if (contextMenu) {
		contextMenu.style.left = props.cursorX.toString() + "px";
		contextMenu.style.top = props.cursorY.toString() + "px";
	}
});


function editMessage() {
	//
}

function replyMessage(id: string) {
	//
}

</script>

<style>

#context-menu {
	position: absolute;
	display: flex;
	flex-direction: column;
	width: 10dvw;
	border: .15rem solid cyan;
	background-color: var(--background-color);
	text-align: center;
}

.context-menu-item:hover {
	background-color: rgb(50, 50, 50);
}

</style>