<template>
	<input id="search-friend-bar" placeholder="search"/>

	<!-- we aren't checking for the "all" variant, since this is the default and fallback one -->

	<p v-if="props.variant === 'online'" style="text-align: left;">Online – 0</p>
	<p v-else-if="props.variant === 'pending'" style="text-align: left;">Friend Requests – 0</p>
	<p v-else style="text-align: left;">Friends – {{ friends?.length || 0 }}</p>

	<div id="friends-list">
		<div v-if="props.variant === 'online'">
			Not Implemented
		</div>

		<div v-else-if="props.variant === 'pending'">
			Not Implemented
		</div>

		<div v-else>
			<UserEntry v-for="user of friends" :user="user" :name="user.display_name || user.username"
			:href="`/me/${user.uuid}`"/> 
		</div>
	</div>
</template>

<script lang="ts" setup>
const { fetchFriends } = useApi();

const friends = await fetchFriends().then((response) => {
	return response.sort((a, b) => getDisplayName(a).localeCompare(getDisplayName(b)))
})

const props = defineProps<{
    variant: string
}>();
</script>

<style>
#search-friend-bar {
	text-align: left;
	margin-top: .8em;
	padding: .3em .5em;
	width: 100%;

	border-radius: 1em;
	border: 1px solid var(--accent-color);

	box-sizing: border-box;
	
	color: inherit;
	background-color: unset;
	font-weight: medium;
	letter-spacing: .04em;
}

#search-friend-bar:empty:before {
	content: attr(placeholder);
	color: gray;
}
</style>