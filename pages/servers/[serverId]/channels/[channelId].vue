<template>
	<NuxtLayout name="client">
		<ResizableSidebar
				width="14rem" min-width="8rem" max-width="30rem"
				border-sides="right" local-storage-name="middleLeftColumn">
			<div id="middle-left-column" class="main-grid-row">
				<div id="server-name-container">
					<span id="server-name" :title="server?.name">{{ server?.name }}</span>
					<button id="server-settings-button" @click="toggleGuildSettings">
						<Icon id="server-settings-icon" name="lucide:chevron-down" />
					</button>
					<GuildOptionsMenu v-if="showGuildSettings" />
				</div>
				<div id="channels-list">
					<ChannelEntry v-for="channel of channels" :name="channel.name"
						:uuid="channel.uuid" :current-uuid="(route.params.channelId as string)"
						:href="`/servers/${route.params.serverId}/channels/${channel.uuid}`" />
				</div>
			</div>
		</ResizableSidebar>
		<MessageArea :channel-url="channelUrlPath" />
		<ResizableSidebar
				width="14rem" min-width="5.5rem" max-width="30rem"
				border-sides="left" local-storage-name="membersListWidth">
			<div id="members-container">
				<div id="members-list">
					<MemberEntry v-for="member of members" :member="member" tabindex="0"/>
				</div>
			</div>
		</ResizableSidebar>
	</NuxtLayout>
</template>

<script lang="ts" setup>
import ChannelEntry from "~/components/Guild/ChannelEntry.vue";
import GuildOptionsMenu from "~/components/Guild/GuildOptionsMenu.vue";
import MemberEntry from "~/components/Guild/MemberEntry.vue";
import ResizableSidebar from "~/components/UserInterface/ResizableSidebar.vue";
import type { ChannelResponse, GuildMemberResponse, GuildResponse } from "~/types/interfaces";

const route = useRoute();

const loading = useState("loading");

const channelUrlPath = `channels/${route.params.channelId}`;

const server = ref<GuildResponse | undefined>();
const channels = ref<ChannelResponse[] | undefined>();
const channel = ref<ChannelResponse | undefined>();

const members = ref<GuildMemberResponse[]>();

const showInvitePopup = ref(false);
const showGuildSettings = ref(false);

//const servers = await fetchWithApi("/servers") as { uuid: string, name: string, description: string }[];
//console.log("channelid: servers:", servers);

const { fetchMembers } = useApi();

onMounted(async () => {
	console.log("mounting");
	const guildUrl = `guilds/${route.params.serverId}`;
	server.value = await fetchWithApi(guildUrl);
	console.log("fetched guild");
	await setArrayVariables();
	console.log("set array variables");
});

onActivated(async () => {
	console.log("activating");
	const guildUrl = `guilds/${route.params.serverId}`;
	server.value = await fetchWithApi(guildUrl);
	console.log("fetched guild");
	await setArrayVariables();
	console.log("set array variables");
});

async function setArrayVariables() {
	const membersRes = await fetchMembers(route.params.serverId as string);
	members.value = membersRes.objects;
	members.value = await fetchMembers(route.params.serverId as string);
	console.log("Placeholder count:", totalMemberCount.value);
	const guildUrl = `guilds/${route.params.serverId}`;
	channels.value = await fetchWithApi(`${guildUrl}/channels`);
	console.log("channels:", channels.value);
	channel.value = await fetchWithApi(`/channels/${route.params.channelId}`);
	console.log("channel:", channel.value);
}

function toggleGuildSettings(e: Event) {
	e.preventDefault();
	showGuildSettings.value = !showGuildSettings.value;
}

function toggleInvitePopup(e: Event) {
	e.preventDefault();
	showInvitePopup.value = !showInvitePopup.value;
}

function handleMemberClick(member: GuildMemberResponse) {
}
</script>

<style>
#members-container {
	background: var(--optional-member-list-background);
}

#members-list {
	display: flex;
	flex-direction: column;
	overflow-x: hidden;
	overflow-y: scroll;
	padding-left: 1.25em;
	padding-right: 1.25em;
	padding-top: 0.75em;
	padding-bottom: 0.75em;
	max-height: calc(100% - 0.75em * 2); /* 100% - top and bottom */
}

.member-item {
	display: flex;
	margin-top: .5em;
	margin-bottom: .5em;
	gap: .5em;
	align-items: center;
	text-align: left;
	cursor: pointer;
}

#channels-list {
	display: flex;
	flex-direction: column;
	gap: .5em;
	text-overflow: ellipsis;
}

.member-display-name {
	overflow: hidden;
	text-overflow: ellipsis;
}

#server-name-container {
	padding-top: 3dvh;
	padding-bottom: 3dvh;
	display: flex;
	justify-content: center;
	position: relative;
}

#server-name {
	font-size: 1.5em;
	overflow: hidden;
	text-overflow: ellipsis;
}

#server-settings-button {
	background-color: transparent;
	font-size: 1em;
	color: white;
	border: none;
	padding: 0%;
}
</style>