<template>
	<ResizableSidebar
			width="14rem" min-width="8rem" max-width="30rem"
			border-sides="right" local-storage-name="middleLeftColumn">

		<div id="guild-sidebar">
			<div id="guild-top-container">
				<span id="guild-name" :title="props.guild?.name">{{ props.guild?.name }}</span>
				<button id="guild-settings-button" @click="toggleGuildSettings">
					<Icon name="lucide:chevron-down" />
				</button>

				<GuildOptionsMenu v-if="showGuildSettings" />
			</div>
			<div id="channels-list">
				<ChannelEntry v-for="channel of channels"
					:name="channel.name"
					:uuid="channel.uuid" :current-uuid="(route.params.channelId as string)"
					:href="`/servers/${route.params.serverId}/channels/${channel.uuid}`" />
			</div>
		</div>
	</ResizableSidebar>
</template>

<script lang="ts" setup>
import ChannelEntry from "~/components/Guild/ChannelEntry.vue";
import ResizableSidebar from "../UserInterface/ResizableSidebar.vue";
import type { ChannelResponse, GuildResponse, INavbar } from "~/types/interfaces";

const props = defineProps<{
    guild: GuildResponse
}>();

const route = useRoute();
const { fetchChannels } = useApi();

const showGuildSettings = ref(false);

const channels: ChannelResponse[] = await fetchChannels(props.guild.uuid);

function toggleGuildSettings(e: Event) {
	e.preventDefault();
	showGuildSettings.value = !showGuildSettings.value;
}

</script>

<style scoped>
#guild-top-container {
	min-height: var(--navbar-height);
	max-height: var(--navbar-height);
	width: 100%;

	display: flex;
	justify-content: center;
	position: relative;

	border-bottom: 1px solid var(--padding-color);
	background-color: var(--topbar-background-color);
}

#guild-name {
	font-size: 1.5em;
	overflow: hidden;
	text-overflow: ellipsis;
}

#guild-settings-button {
	background-color: transparent;
	font-size: 1em;
	color: white;
	border: none;
	padding: 0%;
}

#channels-list {
	background: var(--optional-channel-list-background);
	background-color: var(--sidebar-background-color);

	display: flex;
	flex-direction: column;
	gap: .5em;
	text-overflow: ellipsis;
	
	padding-top: .5em;
	padding-bottom: .5em;
	max-height: calc(100% - 1em); /* 100% - top and bottom padding */

	padding-left: .5em;
	padding-right: .5em;
}
</style>
