<template>
	<Loading v-show="loading" />

	<div :class="{ hidden: loading, visible: !loading }" id="client-root">
		<div class="flex-container-row">
			<GuildList />
			<slot />
		</div>
	</div>
</template>

<script lang="ts" setup>
import Loading from '~/components/Popups/Loading.vue';
import GuildList from '~/components/UserInterface/GuildList.vue';

definePageMeta({
	keepalive: true
});

const loading = useState("loading", () => false);

</script>

<style>
#client-root {
	height: 100dvh;
	width: 100dvw;
	display: flex;
}

.hidden {
	opacity: 0%;
}

.visible {
	opacity: 100%;
	transition: opacity 500ms;
}


.flex-container-row,
.flex-container-column {
	display: flex;
    overflow: auto;
	flex-grow: 1;
}

.flex-container-row {
	flex-direction: row;
}

.flex-container-column {
	flex-direction: column;
}

</style>
