<template>
  <NuxtLayout name="client">
	<DirectMessagesSidebar />
	<div :id="$style['page-content']">
		<div :id="$style['navigation-bar']">
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

<style module>
#page-content {
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
</style>