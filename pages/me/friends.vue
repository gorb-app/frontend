<template>
  <NuxtLayout name="client">
	<DirectMessagesSidebar />
	<div id="friends-page-content">
		<div id="navigation-bar">
			<Button v-for="button of buttons" :text="button.label" variant="normal" :callback="button.updateFilter" />
		</div>
		
		<div>
			<AddFriend v-if="filter == 'add'"></AddFriend>
			<FriendsList v-else :variant="filter"></FriendsList>
		</div>

	</div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import AddFriend from '~/components/Me/AddFriend.vue';
import DirectMessagesSidebar from '~/components/Me/DirectMessagesSidebar.vue';
import FriendsList from '~/components/Me/FriendsList.vue';
import Button from '~/components/UserInterface/Button.vue';

const buttons = [
	{ label: "All Friends", updateFilter: () => updateFilter('all'), variant: "neutral" },
	{ label: "Online", updateFilter: () => updateFilter('online'), variant: "neutral" },
	{ label: "Pending", updateFilter: () => updateFilter('pending'), variant: "neutral" },
	{ label: "Add Friend", updateFilter: () => updateFilter('add'), variant: "primary" },
]

let filter = ref("all");

function updateFilter(newFilter: string) {
	filter.value = newFilter;
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