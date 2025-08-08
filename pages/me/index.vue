<template>
  <NuxtLayout name="client">
	<DirectMessagesSidebar />
	<div :id="$style['page-content']">
		<div :id="$style['navigation-bar']">
			<Button :text="`All Friends – ${friends?.length}`" variant="neutral" :callback="() => updateFilter('all')" />
			<Button :text="`Online – ${0}`" variant="neutral" :callback="() => updateFilter('online')" />
			<Button :text="`Pending – ${0}`" variant="neutral" :callback="() => updateFilter('pending')" />
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
import type { NavbarInterface } from '~/types/interfaces';

const { fetchFriends } = useApi();

let filter = ref("all");
const navbar = useState<NavbarInterface>("navbar")

const friends = await fetchFriends()

function updateFilter(newFilter: string) {
	filter.value = newFilter;
}

onMounted(async () => {
	updateNavbar()
})

onActivated(async () => {
	updateNavbar()
})

function updateNavbar() {
	navbar.value.channelItems = []
	navbar.value.contextName = "Direct Messages"
	navbar.value.contextIcon = undefined
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