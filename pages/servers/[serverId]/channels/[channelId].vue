<template>
	<NuxtLayout name="client">
		<GuildSidebar v-if="guild" :guild="guild" />
		<div class="flex-container-column">
			<GuildNavbar id="navbar" 
				v-if="guild"
				:guild="guild" />

			<div class="flex-container-row">
				<MessageArea :channel-url="channelUrlPath" />
				<GuildMemberList v-if="guild" :guild="guild" />
			</div>
		</div>
	</NuxtLayout>
</template>

<script lang="ts" setup>
import type { GuildResponse, INavbar } from "~/types/interfaces";

const route = useRoute();
const { fetchGuild } = useApi()

const channelUrlPath = `channels/${route.params.channelId}`;

const guild: GuildResponse | undefined = await fetchGuild(route.params.serverId as string)

// function toggleInvitePopup(e: Event) {
// 	e.preventDefault();
// 	showInvitePopup.value = !showInvitePopup.value;
// }

// function handleMemberClick(member: GuildMemberResponse) {
// }

</script>

<style scoped>

</style>