<template>
	<div style="text-align: left;">
		<h3>Add a Friend</h3>
		Enter a friend's Gorb username to send them a friend request.
	</div>
	
	<div id="add-friend-search-bar">
		<input id="add-friend-search-input" ref="inputField"
				placeholder="blahaj.enjoyer" maxlength="32" @keypress.enter="sendRequest"/> <!-- REMEMBER TO CHANGE THIS WHEN WE ADD FEDERATION--> 
		<Button id="friend-request-button" :callback="sendRequest" text="Send Friend Request"></Button>
	</div>
</template>

<script lang="ts" setup>
import Button from '~/components/UserInterface/Button.vue';

const inputField = ref<HTMLInputElement>();
const { addFriend } = useApi();


async function sendRequest() {
	if (inputField.value) {
		try {
			await addFriend(inputField.value.value)
			alert("Friend request sent!")
		} catch (error: any) {
			if (error?.response?.status !== 200) {
				alert(`error ${error?.response?.status} met whilst trying to add friend\n"${error?.response._data?.message}"`)
			}
		}
	}
}
</script>
<style>

#add-friend-search-bar {
	display: flex;

	text-align: left;
	margin-top: .8em;
	padding: .3em .3em;

	border-radius: 1em;
	border: 1px solid var(--accent-color);
}

#add-friend-search-input {
	border: none;
	box-sizing: border-box;

	margin: 0 .2em;

	flex-grow: 1;
	
	color: inherit;
	background-color: unset;
	font-weight: medium;
	letter-spacing: .04em;
}

#add-friend-search-input:empty:before {
	content: attr(placeholder);
	color: gray;
}
</style>