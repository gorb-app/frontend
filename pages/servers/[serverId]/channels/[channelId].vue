<template>
	<NuxtLayout name="client">
		<GuildSidebar v-if="guild" :guild="guild" />
		<div class="flex-container-column">
			<GuildNavbar id="navbar" 
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

const route = useRoute();
const { fetchGuild, fetchChannel } = useApi()

const channelId = route.params.channelId as string
const guildId = route.params.serverId as string

const channelUrlPath = `channels/${channelId}`;

const guild = await fetchGuild(guildId)
const channel = await fetchChannel(channelId)

// function toggleInvitePopup(e: Event) {
// 	e.preventDefault();
// 	showInvitePopup.value = !showInvitePopup.value;
// }

// function handleMemberClick(member: GuildMemberResponse) {
// }

</script>

<style scoped>

</style>