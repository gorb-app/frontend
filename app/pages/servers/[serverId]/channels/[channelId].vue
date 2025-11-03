<template>
	<NuxtLayout name="client">
		<GuildSidebar v-if="guild" :guild="guild" />
		<div class="flex-container-column">
			<GuildChannelNavbar id="navbar" 
				v-if="guild && channel"
				:guild="guild"
				:channel="channel"/>

			<div class="flex-container-row">
				<MessageArea :channel-url="channelUrlPath" />
				<GuildMemberList v-if="guild" :guild="guild" />
			</div>
		</div>
	</NuxtLayout>
</template>

<script lang="ts" setup>
import { WSEvent } from '~/types/enums';
import type { ChannelResponse, GuildMemberResponse, GuildResponse, WSMessage } from '~/types/interfaces';

const route = useRoute();
const router = useRouter();
const { fetchGuild, fetchChannel } = useApi()

const channelId = route.params.channelId as string
const guildId = route.params.serverId as string

const ws = await useWebSocket();

const channelUrlPath = `channels/${channelId}`;

let guild: GuildResponse | undefined;
let channel: ChannelResponse | undefined;

try {
	guild = await fetchGuild(guildId)
} catch (error) {
	console.error("Failed to fetch guild:", error);
}

try {
	channel = await fetchChannel(channelId)
} catch (error) {
	console.error("Failed to fetch channel:", error);
}

const { fetchMeMember } = useApi();
const me = useState<GuildMemberResponse | undefined>("me");
if (!me.value || me.value.guild_uuid != guildId) {
	const fetchedMe = await fetchMeMember(guildId);
	me.value = fetchedMe;
}

onActivated(() => {
	const wsMessage: WSMessage = {
		event: WSEvent.ChannelSubscribe,
		id: generateEventId(),
		entity: channelId
	};
	
	ws.socket.value.send(JSON.stringify(wsMessage));
	console.log("Subscribed to channel", channelId);
});

// function toggleInvitePopup(e: Event) {
// 	e.preventDefault();
// 	showInvitePopup.value = !showInvitePopup.value;
// }

// function handleMemberClick(member: GuildMemberResponse) {
// }

router.beforeEach((to, from, next) => {
	console.log("[ROUTER] from:", from.fullPath);
	console.log("[ROUTER] to:", to.fullPath);
	if (from.fullPath == route.fullPath) {
		const wsMessage: WSMessage = {
			event: WSEvent.ChannelUnsubscribe,
			id: generateEventId(),
			entity: channelId
		};

		console.log("unsub value:", ws.socket.value);
		console.log("unsub msg:", wsMessage);
		ws.socket.value.send(JSON.stringify(wsMessage));
		console.log("Unsubscribed from channel", channelId);
	}
	console.log("dsifjids");
	next();
});

</script>

<style scoped>

</style>