<template>
	<Loading v-show="loading" />
	<div :class="{ hidden: loading, visible: !loading }" id="client-root">
		<div id="homebar">
			<div class="homebar-item">
				main bar
			</div>
			</div>
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
		</div>
		<slot />
	</div>
</template>

<script lang="ts" setup>
import type { GuildResponse } from '~/types/interfaces';

const loading = useState("loading", () => false);

const guilds: GuildResponse[] | undefined = await fetchWithApi("/me/guilds");
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

.sidebar-icon {
	width: 3rem;
	height: 3rem;
}

#current-info {
	grid-column: 2;
	grid-row: 1;
}

#left-column {
	display: flex;
	flex-direction: column;
	gap: 2dvh;
	padding-left: .5dvw;
	padding-right: .5dvw;
	border-right: 1px solid rgb(70, 70, 70);
	padding-top: 1.5dvh;
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
}

</style>