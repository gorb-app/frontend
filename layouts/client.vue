<template>
	<Loading v-show="loading" />
	<div :class="{ hidden: loading, visible: !loading }" id="client-root">
		<div id="homebar">
			<div class="homebar-item">
				<marquee>
					gorb!!!!!
				</marquee>
			</div>
		</div>
		<div id = "page-content">
			<div id="left-column">
				<div id="left-column-top">
					<NuxtLink id="home-button" href="/me">
						<img class="sidebar-icon" src="/public/icon.svg"/>
					</NuxtLink>
					<div id="servers-list">
						<NuxtLink v-for="guild of guilds" :href="`/servers/${guild.uuid}`">
							<img v-if="guild.icon" class="sidebar-icon" :src="guild.icon" :alt="guild.name"/>
							<Icon v-else name="lucide:server" class="sidebar-icon white" :alt="guild.name" />
						</NuxtLink>
					</div>
				</div>
				<div id="left-column-bottom">
					<div ref="createButtonContainer">
						<button id="create-button" @click.prevent="createDropdown">
							<Icon id="create-icon" name="lucide:square-plus" />
						</button>
					</div>
					<NuxtLink id="settings-menu" href="/settings">
						<Icon name="lucide:settings" class="sidebar-icon" alt="Settings menu" />
					</NuxtLink>
				</div>
			</div>
			<slot />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ModalBase } from '#components';
import { render } from 'vue';
import GuildDropdown from '~/components/Guild/GuildDropdown.vue';
import Button from '~/components/UserInterface/Button.vue';
import type { GuildResponse } from '~/types/interfaces';

const loading = useState("loading", () => false);

const createButtonContainer = ref<HTMLButtonElement>();

const api = useApi();

const options = [
	{ name: "Join", value: "join", callback: async () => {
			console.log("join guild!");
			const div = document.createElement("div");
			const guildJoinModal = h(ModalBase, {
				title: "Join Guild",
				id: "guild-join-modal",
				onClose: () => {
					unrender(div);
				},
				onCancel: () => {
					unrender(div);
				},
				style: "height: 20dvh; width: 15dvw"
			},
			[
				h("input", {
					id: "guild-invite-input",
					type: "text",
					placeholder: "oyqICZ",
				}),
				h(Button, {
					text: "Join",
					variant: "normal",
					callback: async () => {
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
				})
			]);
			document.body.appendChild(div);
			render(guildJoinModal, div);
		}
	},
	{ name: "Create", value: "create", callback: async () => {
			console.log("create guild");
			const user = await useAuth().getUser();
			const div = document.createElement("div");
			const guildCreateModal = h(ModalBase, {
				title: "Create a Guild",
				id: "guild-join-modal",
				onClose: () => {
					unrender(div);
				},
				onCancel: () => {
					unrender(div);
				},
				style: "height: 20dvh; width: 15dvw;"
			},
			[
				h("input", {
					id: "guild-name-input",
					type: "text",
					placeholder: `${user?.display_name || user?.username}'s Awesome Bouncy Castle'`,
					style: "width: 100%"
				}),
				h(Button, {
					text: "Create!",
					variant: "normal",
					callback: async () => {
						const input = document.getElementById("guild-name-input") as HTMLInputElement;
						const name = input.value;
						try {
							const guild = (await api.createGuild(name)) as GuildResponse;
							await api.createChannel(guild.uuid, "general");
						} catch (error) {
							alert(`Couldn't create guild: ${error}`);
						}
					}
				})
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
	const dropdown = h(GuildDropdown, { options });
	const div = document.createElement("div");
	div.classList.add("dropdown", "destroy-on-click");
	if (createButtonContainer.value) {
		createButtonContainer.value.appendChild(div);
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
	height: 100dvh;
	width: 100dvw;
	display: flex;
	flex-direction: column;
	text-align: center;
}

.hidden {
	opacity: 0%;
}

.visible {
	opacity: 100%;
	transition: opacity 500ms;
}

#homebar {
	min-height: 4dvh;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	background: var(--optional-topbar-background);
	background-color: var(--topbar-background-color);
	border-bottom: 1px solid var(--padding-color);
	padding-left: 5dvw;
	padding-right: 5dvw;
}

.homebar-item {
	width: 100dvw;
}

#page-content {
	display: flex;
	flex-direction: row;
	flex-grow: 1;
    overflow: auto;
}

#left-column {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	gap: .75em;
	padding-left: .25em;
	padding-right: .25em;
	padding-top: .5em;
	border-right: 1px solid var(--padding-color);
	background: var(--optional-sidebar-background);
	background-color: var(--sidebar-background-color);
}

#left-column-top, #left-column-bottom {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1.5dvh;
	overflow-y: scroll;
	scrollbar-width: none;
	-ms-overflow-style: none;
}

#left-column-top::-webkit-scrollbar, #left-column-bottom::-webkit-scrollbar {
	display: none;
}

#left-column-bottom {
	padding-top: 1dvh;
	border-top: 1px solid var(--padding-color);
}

#middle-left-column {
	padding-left: 1dvw;
	padding-right: 1dvw;
	border-right: 1px solid var(--padding-color);
}

#home-button {
	border-bottom: 1px solid var(--padding-color);
	padding-bottom: 1dvh;
}

#servers-list {
	display: flex;
	flex-direction: column;
	gap: 1em;
	width: 3.2rem;	
	padding-top: .5em;
}

#create-button {
	color: var(--primary-color);
	background-color: transparent;
	border: none;
	cursor: pointer;
	font-size: 2rem;
	padding: 0;
	display: inline-block;
}

#create-icon {
	float: left;
}

#middle-left-column {
	padding-left: .25em;
	padding-right: .25em;
	border-right: 1px solid var(--padding-color);
	min-width: 13em;
	max-width: 13em;
	overflow-y: scroll;
	overflow-x: hidden;
}

.sidebar-icon {
	width: 3rem;
	height: 3rem;
	overflow-y: scroll;
	overflow-x: hidden;
}

#home-button {
	border-bottom: 1px solid var(--padding-color);
	padding-bottom: .375em;
}

#settings-menu {
	color: var(--primary-color)
}

#settings-menu:hover {
	color: var(--primary-highlighted-color)
}

</style>
