<template>
	<NuxtLayout name="client">
		<div id="middle-left-column" class="main-grid-row">
			<div id="server-title">
				<h3>
					{{ server?.name }}
					<span>
						<button @click="showServerSettings">
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
				<Channel v-for="channel of channels" v-if="route.params.channelId == channel?.uuid" :name="channel.name"
					:href="route.path" :current="true" />
				<Channel v-for="channel of channels" v-else :name="channel.name"
					:href="`/servers/${route.params.serverId}/channels/${channel.uuid}`" />
			</div>
		</div>
		<MessageArea :channel-url="channelUrlPath" />
		<div id="members-list">
			<div class="member-item" v-for="member of members">
				<img v-if="member.avatar" :src="member.avatar" :alt="member.displayName" height="30" />
				<Icon v-else name="lucide:user" size="30" />
				<span class="member-display-name">{{ member.displayName }}</span>
			</div>
		</div>
	</NuxtLayout>
</template>

<script lang="ts" setup>

const route = useRoute();

const server: GuildResponse | undefined = await fetchWithApi(`servers/${route.params.serverId}`);

const channels: ChannelResponse[] | undefined = await fetchWithApi(
	`servers/${route.params.serverId}/channels`
);
const channel: ChannelResponse | undefined = await fetchWithApi(
	route.path
);

const channelUrlPath = `servers/${route.params.serverId}/channels/${route.params.channelId}`;

console.log("channel:", channel);

const showInvitePopup = ref(false);

import type { ChannelResponse, GuildResponse, MessageResponse } from "~/types/interfaces";

//const servers = await fetchWithApi("/servers") as { uuid: string, name: string, description: string }[];
//console.log("servers:", servers);
const members = [
	{
		id: "3287484395",
		displayName: "SauceyRed",
		avatar: ""
	},
	{
		id: "3287484395",
		displayName: "SauceyRed",
		avatar: ""
	},
	{
		id: "3287484395",
		displayName: "SauceyRed",
		avatar: ""
	},
	{
		id: "3287484395",
		displayName: "SauceyRed",
		avatar: ""
	},
	{
		id: "3287484395",
		displayName: "SauceyRed",
		avatar: ""
	},
	{
		id: "3287484395",
		displayName: "SauceyRed",
		avatar: ""
	},
	{
		id: "3287484395",
		displayName: "SauceyRed",
		avatar: ""
	},
	{
		id: "3287484395",
		displayName: "SauceyRed",
		avatar: ""
	},
	{
		id: "3287484395",
		displayName: "SauceyRed",
		avatar: ""
	}
];

function showServerSettings() { }

function toggleInvitePopup(e: Event) {
	e.preventDefault();
	showInvitePopup.value = !showInvitePopup.value;
}
</script>

<style>
.member-item {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: .5em;
	margin-bottom: .5em;
}



#members-list {
	padding-top: 3dvh;
}

#middle-left-column {
	padding-left: 1dvw;
	padding-right: 1dvw;
	border-right: 1px solid rgb(70, 70, 70);
}

#members-list {
	padding-left: 1dvw;
	padding-right: 1dvw;
	border-left: 1px solid rgb(70, 70, 70);
}

</style>