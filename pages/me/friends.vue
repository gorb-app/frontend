<template>
  <NuxtLayout name="client">
	<DirectMessagesSidebar />
	<div :id="$style['page-content']">
		<div :id="$style['navigation-bar']">
			<Button text="All Friends" variant="neutral" :callback="() => updateFilter('all')" />
			<Button text="Online" variant="neutral" :callback="() => updateFilter('online')" />
			<Button text="Pending" variant="neutral" :callback="() => updateFilter('pending')" />
			<Button text="Add Friend" variant="normal" :callback="() => updateFilter('add')" />
		</div>
		
		<div>
			<AddFriend v-if="filter == 'add'"></AddFriend>
			<FriendsList v-else :variant="filter"></FriendsList>
		</div>

	</div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import DirectMessagesSidebar from '~/components/Me/DirectMessagesSidebar.vue';
import Button from '~/components/UserInterface/Button.vue';
import AddFriend from '~/components/Me/AddFriend.vue';
import FriendsList from '~/components/Me/FriendsList.vue';

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