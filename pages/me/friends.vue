<template>
  <NuxtLayout name="client">
	<DirectMessagesSidebar />
	<div id="friends-page-content">
		<div id="navigation-bar">
			<NuxtLink class="friends-sub-page-button" @click.prevent="updateHash('all')">All Friends</NuxtLink>
			<NuxtLink class="friends-sub-page-button" @click.prevent="updateHash('online')">Online</NuxtLink>
			<NuxtLink class="friends-sub-page-button" @click.prevent="updateHash('pending')">Pending</NuxtLink>
			<NuxtLink class="friends-sub-page-button friend-primary-button" @click.prevent="updateHash('addfriend')">Add Friend</NuxtLink>
		</div>
		
		<div>
			<AddFriend v-if="windowHash == '#addfriend'"></AddFriend>
			<FriendsList v-else :variant="windowHash"></FriendsList>
		</div>

	</div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import AddFriend from '~/components/Me/AddFriend.vue';
import DirectMessagesSidebar from '~/components/Me/DirectMessagesSidebar.vue';
import FriendsList from '~/components/Me/FriendsList.vue';

let windowHash = ref(window.location.hash)


function updateHash(newHash: string) {
	window.location.hash = newHash
	windowHash.value = `#${newHash}`;
}
</script>

<style>
#friends-page-content {
	display: flex;
	flex-direction: column;
	
	flex-grow: 1;

	margin: .75em;
}

#navigation-bar {
	display: flex;
	align-items: left;
	text-align: left;
	flex-direction: row;

	gap: .5em;
}

.friends-sub-page-button {
	text-decoration: none;
	color: inherit;
	font-weight: medium;

	padding: 0.2em .5em;
	
	flex-shrink: 0;
	border-radius: 1em;
	background-color: var(--accent-color);

	display: inline-block;
	text-align: center;
	align-content: center;
	cursor: pointer;

	transition: background-color 300ms;
}
.friends-sub-page-button:hover {
	background-color: var(--accent-highlighted-color);
}

.friend-primary-button {
	background-color: var(--primary-color);
}
.friend-primary-button:hover {
	background-color: var(--primary-highlighted-color);
}
</style>