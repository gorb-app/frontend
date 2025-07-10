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
				<NuxtLink id="home-button" href="/">
					<img class="sidebar-icon" src="/public/icon.svg"/>
				</NuxtLink>
				<div id="servers-list">
					<NuxtLink v-for="guild of guilds" :href="`/servers/${guild.uuid}`">
						<img v-if="guild.icon" class="sidebar-icon" :src="guild.icon" :alt="guild.name"/>
						<Icon v-else name="lucide:server" class="sidebar-icon white" :alt="guild.name" />
					</NuxtLink>
				</div>
				<NuxtLink id="settings-menu" href="/settings">
					<Icon name="lucide:settings" class="sidebar-icon white" alt="Settings menu" />
				</NuxtLink>
			</div>
			<slot />
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { GuildResponse } from '~/types/interfaces';

const loading = useState("loading", () => false);

const guilds: GuildResponse[] | undefined = await fetchWithApi("/me/guilds");
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
	gap: .75em;
	padding-left: .25em;
	padding-right: .25em;
	padding-top: .5em;
	border-right: 1px solid var(--padding-color);
	background: var(--optional-sidebar-background);
	background-color: var(--sidebar-background-color);
}

#servers-list {
	display: flex;
	flex-direction: column;
	gap: 1em;
	width: 3.2rem;	
	padding-top: .5em;
}

#middle-left-column {
	padding-left: .25em;
	padding-right: .25em;
	border-right: 1px solid var(--padding-color);
	min-width: 13em;
	overflow-y: scroll;
	overflow-x: hidden;
}

.sidebar-icon {
	width: 3rem;
	height: 3rem;
	min-width: 10em;
	overflow-y: scroll;
	overflow-x: hidden;
}

#home-button {
	border-bottom: 1px solid var(--padding-color);
	padding-bottom: .375em;
}

#settings-menu {
	position: absolute;
	bottom: .25em;
}

</style>