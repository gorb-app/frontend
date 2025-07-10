<template>
	<NuxtLayout name="client">
		<div id="middle-left-column" class="main-grid-row">
			<div id="server-title">
				<h3>
					{{ server?.name }}
					<span>
						<button @click="showGuildSettings">
							<Icon name="lucide:settings" />
						</button>
					</span>
					<span>
						<button @click="toggleInvitePopup">
							<Icon name="lucide:share-2" />
						</button>
					</span>
					<InvitePopup v-if="showInvitePopup" />
				</h3>
			</div>
			<div id="channels-list">
				<Channel v-for="channel of channels" :name="channel.name"
					:uuid="channel.uuid" :current-uuid="(route.params.channelId as string)"
					:href="`/servers/${route.params.serverId}/channels/${channel.uuid}`" />
			</div>
		</div>
		<MessageArea :channel-url="channelUrlPath" />
		<div id="members-container">
			<div id="members-list">
				<MemberEntry v-for="member of members" :member="member" tabindex="0"/>
			</div>
		</div>
	</NuxtLayout>
</template>

<script lang="ts" setup>

const route = useRoute();

const loading = useState("loading");

const channelUrlPath = `channels/${route.params.channelId}`;

const server = ref<GuildResponse | undefined>();
const channels = ref<ChannelResponse[] | undefined>();
const channel = ref<ChannelResponse | undefined>();

const showInvitePopup = ref(false);

import type { ChannelResponse, GuildMemberResponse, GuildResponse, MessageResponse } from "~/types/interfaces";

//const servers = await fetchWithApi("/servers") as { uuid: string, name: string, description: string }[];
//console.log("channelid: servers:", servers);

const { fetchMembers } = useApi();
const members = await fetchMembers(route.params.serverId as string);

onMounted(async () => {
	console.log("channelid: set loading to true");
	const guildUrl = `guilds/${route.params.serverId}`;
	server.value = await fetchWithApi(guildUrl);

	channels.value = await fetchWithApi(`${guildUrl}/channels`);
	console.log("channels:", channels.value);
	channel.value = await fetchWithApi(`/channels/${route.params.channelId}`);
	console.log("channel:", channel.value);

	console.log("channelid: channel:", channel);
	console.log("channelid: set loading to false");
});

function showGuildSettings() { }

function toggleInvitePopup(e: Event) {
	e.preventDefault();
	showInvitePopup.value = !showInvitePopup.value;
}

function handleMemberClick(member: GuildMemberResponse) {
}
</script>

<style>

#middle-left-column {
	padding-left: .5em;
	padding-right: .5em;
	border-right: 1px solid var(--padding-color);
	background: var(--optional-channel-list-background);
	background-color: var(--sidebar-background-color);
}

#members-container {
	width: 15rem;
	border-left: 1px solid var(--padding-color);
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
}

.member-avatar {
	height: 2.3em;
	width: 2.3em;
	border-radius: 50%;
}

.member-display-name {
	overflow: hidden;
	text-overflow: ellipsis;
}

</style>