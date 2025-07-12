<template>
	<Loading v-show="loading" />
	<div :class="{ hidden: loading, visible: !loading }" id="client-root">
		<div id="homebar">
			<div class="homebar-item">
				main bar
			</div>
			</div>
		<div id="left-column">
			<div id="left-column-top">
				<NuxtLink id="home-button" href="/">
					<Icon name="lucide:house" class="white" size="2rem" />
				</NuxtLink>
				<div id="servers-list">
					<NuxtLink v-for="guild of guilds" :href="`/servers/${guild.uuid}`">
						<Icon name="lucide:server" class="white" size="2rem" />
					</NuxtLink>
				</div>
			</div>
			<div ref="joinServerButton" id="left-column-bottom">
				<button id="join-server-button" @click.prevent="createDropdown">
					<Icon id="join-server-icon" name="lucide:square-plus" />
				</button>
			</div>
		</div>
		<slot />
	</div>
</template>

<script lang="ts" setup>
import { render } from 'vue';
import Dropdown from '~/components/Dropdown.vue';
import Modal from '~/components/Modal.vue';
import type { GuildResponse } from '~/types/interfaces';

const loading = useState("loading", () => false);

const joinServerButton = ref<HTMLButtonElement>();

const api = useApi();

const options = [
	{ name: "Join", value: "join", callback: async () => {
			console.log("join guild!");
			const div = document.createElement("div");
			const guildJoinModal = h(Modal, {
				title: "Join Guild",
				id: "guild-join-modal",
				onClose: () => {
					unrender(div);
				},
				onCancel: () => {
					unrender(div);
				}
			},
			[
				h("input", {
					id: "guild-invite-input",
					type: "text",
					placeholder: "oyqICZ",
				}),
				h("button", {
					onClick: async () => {
						const input = document.getElementById("guild-invite-input") as HTMLInputElement;
						const invite = input.value;
						if (invite.length == 6) {
							try {
								const joinedGuild = await api.joinGuild(invite);
								guilds?.push(joinedGuild);
								return await navigateTo(`/servers/${joinedGuild.uuid}`);
							} catch (error) {
								alert(`Couldn't use invite: ${error}`);
							}
						}
					}
				},
				"Join")
			]);
			document.body.appendChild(div);
			render(guildJoinModal, div);
		}
	},
	{ name: "Create", value: "create", callback: async () => {
			console.log("create guild");
			const user = await useAuth().getUser();
			const div = document.createElement("div");
			const guildCreateModal = h(Modal, {
				title: "Join Guild",
				id: "guild-join-modal",
				onClose: () => {
					unrender(div);
				},
				onCancel: () => {
					unrender(div);
				}
			},
			[
				h("input", {
					id: "guild-name-input",
					type: "text",
					placeholder: `${user?.display_name || user?.username}'s Awesome Bouncy Castle'`,
				}),
				h("button", {
					onClick: async () => {
						const input = document.getElementById("guild-name-input") as HTMLInputElement;
						const name = input.value;
						try {
							await api.createGuild(name);
						} catch (error) {
							alert(`Couldn't create guild: ${error}`);
						}
					}
				},
				"Create")
			]);
			document.body.appendChild(div);
			render(guildCreateModal, div);
		}
	}
];

const guilds: GuildResponse[] | undefined = await fetchWithApi("/me/guilds");

//const servers = await fetchWithApi("/servers") as { uuid: string, name: string, description: string }[];
//console.log("servers:", servers);
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

function createDropdown() {
	const dropdown = h(Dropdown, { options });
	const div = document.createElement("div");
	div.classList.add("dropdown", "destroy-on-click");
	if (joinServerButton.value) {
		joinServerButton.value.appendChild(div);
	} else {
		document.body.appendChild(div);
	}
	render(dropdown, div);
	div.addEventListener("keyup", (e) => {
		if (e.key == "Escape") {
			unrender(div);
		}
	});
	div.focus();
}

</script>

<style>
#client-root {
	/* border: 1px solid white; */
	height: 100dvh;
	display: grid;
	grid-template-columns: 1fr 4fr 18fr 4fr;
	grid-template-rows: 4dvh auto;
	text-align: center;
	
}

.hidden {
	opacity: 0%;
}

.visible {
	opacity: 100%;
	transition-duration: 500ms;
}

#homebar {
	grid-row: 1;
	grid-column: 1 / -1;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	padding-left: 5dvw;
	padding-right: 5dvw;
}

#client-root>div:nth-child(-n+4) {
	border-bottom: 1px solid rgb(70, 70, 70);
}

#__nuxt {
	display: flex;
	flex-flow: column;
}

.grid-column {
	padding-top: 1dvh;
}

#home {
	padding-left: .5dvw;
	padding-right: .5dvw;
}

#current-info {
	grid-column: 2;
	grid-row: 1;
}

#left-column {
	display: grid;
	grid-template-rows: 1fr auto;
	overflow-y: hidden;
	border-right: 1px solid rgb(70, 70, 70);
	padding-top: 1dvh;
	padding-bottom: 1dvh;
}

#left-column-top {
	display: flex;
	flex-direction: column;
	gap: 1.5dvh;
	overflow-y: scroll;
}

#left-column-bottom {
	padding-top: 1dvh;
	border-top: 1px solid rgb(70, 70, 70);
}

#middle-left-column {
	padding-left: 1dvw;
	padding-right: 1dvw;
	border-right: 1px solid rgb(70, 70, 70);
}

#home-button {
	border-bottom: 1px solid rgb(70, 70, 70);
	padding-bottom: 1dvh;
}

#servers-list {
	display: flex;
	flex-direction: column;
	gap: 1dvh;
	overflow-y: scroll;
}

#join-server-button {
	color: white;
	background-color: transparent;
	border: none;
	cursor: pointer;
	font-size: 2rem;
	padding: 0;
	display: inline-block;
}

#join-server-icon {
	float: left;
}

</style>