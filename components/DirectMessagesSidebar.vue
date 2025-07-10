<template>
	<div id="middle-left-column">
		<div id="friend-sidebar">
			<div id="server-title">
				<h3>Direct Messages</h3>
			</div>
			<VerticalSpacer />
			<NuxtLink class="user-item" :href="`/me/friends`" tabindex="0">
				<Icon class="user-avatar" name="lucide:user" />
				<span class="user-display-name">Friends</span>
			</NuxtLink>
			<VerticalSpacer />
			<div id="direct-message-list">
				<UserEntry v-for="user of friends" :user="user" :name="user.display_name || user.username"
					:href="`/me/${user.uuid}`"/> 
				<!-- <Channel v-for="channel of channels" :name="channel.name"
					:uuid="channel.uuid" :current-uuid="(route.params.channelId as string)"
					:href="`/servers/${route.params.serverId}/channels/${channel.uuid}`" /> -->
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import VerticalSpacer from './UserInterface/VerticalSpacer.vue';

const { fetchFriends } = useApi();

const friends = await fetchFriends()

console.log(friends)

definePageMeta({
	layout: "client"
});

</script>

<style>
#middle-left-column {
	background: var(--optional-channel-list-background);
	background-color: var(--sidebar-background-color);
}

#friend-sidebar {
	padding-left: .5em;
	padding-right: .5em;
}
</style>