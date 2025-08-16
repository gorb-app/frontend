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
import type { GuildMemberResponse } from '~/types/interfaces';


const route = useRoute();
const { fetchGuild, fetchChannel } = useApi()

const channelId = route.params.channelId as string
const guildId = route.params.serverId as string

const channelUrlPath = `channels/${channelId}`;

const guild = await fetchGuild(guildId)
const channel = await fetchChannel(channelId)

const { fetchMeMember } = useApi();
const me = useState<GuildMemberResponse | undefined>("me");
if (!me.value || me.value.guild_uuid != guildId) {
	const fetchedMe = await fetchMeMember(guildId);
	me.value = fetchedMe;
}

// function toggleInvitePopup(e: Event) {
// 	e.preventDefault();
// 	showInvitePopup.value = !showInvitePopup.value;
// }

// function handleMemberClick(member: GuildMemberResponse) {
// }

</script>

<style scoped>

</style>