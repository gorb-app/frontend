<template>
	<div id="client-root">
		<div id="home" class=".homebar-item">
			<NuxtLink href="/web">
				<img src="~/assets/img/house.svg" alt="Home">
			</NuxtLink>
		</div>
		<div id="current-channel" class=".homebar-item">
			main bar
		</div>
		<div id="test" class=".homebar-item">test</div>
		<div id="test2" class=".homebar-item">test2</div>
		<div id="servers-list">
			<NuxtLink v-for="server of servers" :href="'web' + server.url">
				<img src="~/assets/img/server.svg" :alt="server.name">
			</NuxtLink>
		</div>
		<div id="channels-list" class="main-grid-row">
			<Channel v-for="channel of channels" :name="channel.name" :href="`${useRoute().path}/${channel.id}`" />
		</div>
		<div id="message-history" class="main-grid-row">
			<div id="messages">
				<Message v-for="message of messages" :img="pfp" :username="message.author.username" :text="message.text"
					:timestamp="message.timestamp" format="12" />
			</div>
			<div id="message-box" class="main-grid-row">
				<form @submit="sendMessage">
					<input type="text" name="message-box-input" id="message-box-input">
					<button type="submit">
						<img :src="checkmark" alt="Send" width="20">
					</button>
				</form>
			</div>
		</div>
		<div id="members-list">
			<div class="member-item" v-for="member of members">
				<img src="~/assets/img/tiger-head.svg" :alt="member.displayName" width="30dvw">
				<span class="member-display-name">{{ member.displayName }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>

import pfp from "~/assets/img/tiger-head.svg";
import checkmark from "~/assets/img/check-mark.png";

const servers = [
	{
		name: "Test",
		url: "/servers/284103257435"
	},
	{
		name: "Test",
		url: "/servers/284103257435"
	},
	{
		name: "Test",
		url: "/servers/284103257435"
	}
];

const members = [
	{
		id: "3287484395",
		displayName: "SauceyRed"
	},
	{
		id: "3287484395",
		displayName: "SauceyRed"
	},
	{
		id: "3287484395",
		displayName: "SauceyRed"
	},
	{
		id: "3287484395",
		displayName: "SauceyRed"
	},
	{
		id: "3287484395",
		displayName: "SauceyRed"
	},
	{
		id: "3287484395",
		displayName: "SauceyRed"
	},
	{
		id: "3287484395",
		displayName: "SauceyRed"
	},
	{
		id: "3287484395",
		displayName: "SauceyRed"
	},
	{
		id: "3287484395",
		displayName: "SauceyRed"
	}
];

const messages = [
	{
		author: {
			id: "3287484395",
			username: "SauceyRed",
			avatar: "~/assets/img/tiger-head.svg"
		},
		text: "hello gamers!",
		timestamp: 1745948498000
	},
	{
		author: {
			id: "3287484395",
			username: "SauceyRed",
			avatar: "~/assets/img/tiger-head.svg"
		},
		text: "yo what's up!",
		timestamp: 1745948498000
	},
	{
		author: {
			id: "3287484395",
			username: "SauceyRed",
			avatar: "~/assets/img/tiger-head.svg"
		},
		text: "how are you guys?",
		timestamp: 1745948498000
	},
	{
		author: {
			id: "3287484395",
			username: "SauceyRed",
			avatar: "~/assets/img/tiger-head.svg"
		},
		text: "im doing well",
		timestamp: 1745948498000
	}
]

const channels = [
	{
		name: "#super-cool-channel",
		id: "8gh9548rg44"
	},
	{
		name: "#super-lame-channel",
		id: "hgff45387hy"
	},
	{
		name: "#secret-channel",
		id: "g8f734h87gt"
	},
]

function sendMessage(e: Event) {
	e.preventDefault();
	const textInput = document.getElementById("message-box-input") as HTMLInputElement;
	const text = textInput.value;
	console.log("MESSAGE SENT!!!");
	console.log("text:", text);
}

</script>

<style>
#client-root {
	/* border: 1px solid white; */
	height: 100%;
	display: grid;
	grid-template-columns: 1fr 4fr 18fr 4fr;
	grid-template-rows: 8dvh auto;
	text-align: center;
}

#client-root>div:nth-child(-n+4) {
	border-bottom: 1px solid rgb(70, 70, 70);
}

#client-root div {
	/* border: 1px solid cyan; */
}

#main-bar {}

#__nuxt {
	display: flex;
	flex-flow: column;
	height: 100%;
}

.grid-column {
	padding-top: 1dvh;
}

#home {
	grid-column: 1;
	grid-row: 1;
}

#current-info {
	grid-column: 2;
	grid-row: 1;
}

#test {
	grid-column: 3;
	grid-row: 1;
}

#utilities {
	display: flex;
	flex-direction: row;
	margin-bottom: 3dvh;
	justify-content: center;
}

#left-sidebar-container,
#right-sidebar-container {
	text-align: center;
}

.member-item {
	display: flex;
	justify-content: center;
	align-items: center;
}

.bottom-border {
	border-bottom: 1px solid rgb(70, 70, 70);
}

.left-border {
	border-left: 1px solid rgb(70, 70, 70);
}

.right-border {
	border-right: 1px solid rgb(70, 70, 70);
}

#main-content {
	display: grid;
	grid-template-rows: 1fr 15fr 30fr 2fr;
	text-align: center;
	margin-left: 1dvw;
}

#message-box {
	border: 1px solid rgb(70, 70, 70);
	width: 100%;
	margin-bottom: 1dvh;
	height: 5%;
	text-align: center;
}

#message-box-input {
	width: 80%;
	height: 100%;
}

.main-grid-row {
	/* border: 1px solid cyan; */
}

#main-bar {}

#servers-list,
#channels-list,
#message-history,
#members-list {
	margin-top: 3dvh;
}

#message-history {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
</style>