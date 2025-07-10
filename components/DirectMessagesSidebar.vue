<template>
	<div id="friend-sidebar">
		<div id="server-title">
			<h3>Direct Messages</h3>
		</div>
		<verticalSpacer />
		<div id="direct-message-list">
			<UserEntry v-for="user of friends" :user="user" :name="user.display_name || user.username"
				:href="`/me/${user.uuid}`"/> 
			<!-- <Channel v-for="channel of channels" :name="channel.name"
				:uuid="channel.uuid" :current-uuid="(route.params.channelId as string)"
				:href="`/servers/${route.params.serverId}/channels/${channel.uuid}`" /> -->
		</div>
	</div>
</template>

<script lang="ts" setup>
const { fetchFriends } = useApi();

const friends = await fetchFriends()

console.log(friends)

definePageMeta({
	layout: "client"
});

</script>

<style>
#friend-sidebar {
	padding-left: .5em;
	padding-right: .5em;
	border-right: 1px solid var(--padding-color);
	background: var(--optional-channel-list-background);
	background-color: var(--sidebar-background-color);
}
</style>