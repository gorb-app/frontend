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
				<div class="member-item" v-for="member of members" tabindex="0">
					<img v-if="member.user.avatar" class="member-avatar" :src="member.user.avatar" :alt="member.user.display_name ?? member.user.username" />
					<Icon v-else class="member-avatar" name="lucide:user" />
					<span class="member-display-name">{{ member.user.display_name ?? member.user.username }}</span>
				</div>
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

import type { ChannelResponse, GuildResponse, MessageResponse } from "~/types/interfaces";

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
</script>

<style>

#middle-left-column {
	padding-left: 1dvw;
	padding-right: 1dvw;
	border-right: 1px solid rgb(70, 70, 70);
}

#members-container {
	padding-top: 1dvh;
	padding-left: 1dvw;
	padding-right: 1dvw;
	border-left: 1px solid rgb(70, 70, 70);
}

#members-list {
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	padding-left: 1dvw;
	padding-right: 1dvw;
	margin-top: 1dvh;
}

.member-item {
	display: grid;
	grid-template-columns: 2dvw 1fr;
	margin-top: .5em;
	margin-bottom: .5em;
	gap: 1em;
	align-items: center;
	text-align: left;
	
}

#channels-list {
	display: flex;
	flex-direction: column;
	gap: 1dvh;
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