<template>
	<ResizableSidebar width="14rem" min-width="8rem" max-width="30rem" border-sides="right" local-storage-name="middleLeftColumn">
		<div id="middle-left-column">
			<div id="friend-sidebar">
				<div>
					<h3>Direct Messages</h3>
				</div>
				<VerticalSpacer />
	
				<NuxtLink class="user-item" :href="`/me`" tabindex="0">
					<Icon class="user-avatar" name="lucide:user" />
					<span class="user-display-name">Friends</span>
				</NuxtLink>
				<VerticalSpacer />
				
				<div id="direct-message-list">
					<UserEntry v-for="user of friends" :user="user"
							:href="`/me/${user.uuid}`"/> 
				</div>
			</div>
		</div>
	</ResizableSidebar>
</template>

<script lang="ts" setup>
import VerticalSpacer from '~/components/UserInterface/VerticalSpacer.vue';
import ResizableSidebar from '../UserInterface/ResizableSidebar.vue';

const { fetchFriends } = useApi();

const friends = await fetchFriends()
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