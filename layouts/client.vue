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
		<div id="page-content">
			<div id="left-column">
				<div class="left-column-segment">
					<NuxtLink id="home-button" href="/me">
						<img class="sidebar-icon" src="/public/icon.svg"/>
					</NuxtLink>
				</div>
				<VerticalSpacer />
				<div class="left-column-segment" id="left-column-middle">
					<NuxtLink v-for="guild of guilds" :href="`/servers/${guild.uuid}`">
						<NuxtImg v-if="guild.icon"
							class="sidebar-icon guild-icon"
							:alt="guild.name"
							:src="guild.icon" />
						<NuxtImg v-else-if="!blockedCanvas"
							class="sidebar-icon guild-icon"
							:alt="guild.name"
							:src="generateDefaultIcon(guild.name, guild.uuid)" />
						<Icon v-else name="lucide:server"
							:style="`color: ${generateIrcColor(guild.uuid, 50)}`"
							class="sidebar-icon guild-icon"
							:alt="guild.name" />
					</NuxtLink>
				</div>
				<VerticalSpacer />
				<div class="left-column-segment">
					<div ref="createButtonContainer">
						<button id="create-button" class="sidebar-bottom-buttons" @click.prevent="createDropdown">
							<Icon id="create-icon" name="lucide:square-plus" alt="Create or join guild"/>
						</button>
					</div>
					<NuxtLink id="settings-menu" class="sidebar-bottom-buttons" href="/settings">
						<Icon name="lucide:settings" alt="Settings menu" />
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
import VerticalSpacer from '~/components/UserInterface/VerticalSpacer.vue';
import type { GuildResponse } from '~/types/interfaces';

const loading = useState("loading", () => false);

const createButtonContainer = ref<HTMLButtonElement>();

const api = useApi();

const blockedCanvas = isCanvasBlocked()

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
								guilds.push(joinedGuild);
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
					placeholder: `${getDisplayName(user!)}'s Awesome Bouncy Castle'`,
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

const guilds = await api.fetchMyGuilds();

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

	padding-left: var(--sidebar-margin);
	padding-right: var(--sidebar-margin);
	padding-top: .5em;
	
	background: var(--optional-sidebar-background);
	background-color: var(--sidebar-background-color);

	border-right: 1px solid var(--padding-color);
}

.left-column-segment {
	display: flex;
	flex-direction: column;

	scrollbar-width: none;
}

.left-column-segment::-webkit-scrollbar {
	display: none;
}

#left-column-middle {
	overflow-y: scroll;
	flex-grow: 1;
	gap: var(--sidebar-icon-gap);
}

#home-button {
	height: var(--sidebar-icon-width);
}

.guild-icon {
	border-radius: var(--guild-icon-radius);
}

.sidebar-icon {
	width: var(--sidebar-icon-width);
	height: var(--sidebar-icon-width);
}

.sidebar-bottom-buttons {
	color: var(--primary-color);
	background-color: transparent;
	border: none;
	cursor: pointer;
	font-size: 2.4rem;
	padding: 0;
	display: inline-block;
}

.sidebar-bottom-buttons:hover {
	color: var(--primary-highlighted-color);
}

</style>
