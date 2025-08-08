<template>
	<div id="navbar">
		<div v-if="props.clientItems" v-for="entry of props.clientItems" id="navbar-left">
			<button class="navbar-item" :title="entry.title"
					@click.prevent="entry.callback()">
				<Icon :name="entry.icon" class="navbar-item-icon" />
			</button>
		</div>
		<div id="navbar-middle">
			<NuxtImg v-if="props.contextIcon"
				class="context-icon"
				:src="props.contextIcon" />
			<DefaultIcon v-else-if="props.contextName && props.guildUuid"
				class="context-icon" 
				:name="props.contextName" :seed="props.guildUuid"/>
			<NuxtImg v-else
				class="context-icon"
				:src="defaultIcon" />
			
			<div class="context-title">
				{{ props.contextName }}
			</div>
		</div>
		<div v-if="props.channelItems" v-for="entry of props.channelItems" id="navbar-right">
			<button class="navbar-item" :title="entry.title"
					@click.prevent="entry.callback()">
				<Icon :name="entry.icon" class="navbar-item-icon" />
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { NavbarInterface, NavbarItem } from '~/types/interfaces';

const props = defineProps<NavbarInterface>();

const runtimeConfig = useRuntimeConfig();
const defaultIcon = `${runtimeConfig.app.baseURL}/icon.svg`

</script>

<style scoped>
#navbar {
	--navbar-height: 5dvh;
	--navbar-icon-size: 3dvh;
	--navbar-gap: calc(3dvh * .2);
	--side-margins: calc(.6dvw + .35dvh); /* try to make it reasonable at any aspect ratio */

	left: 0;
	right: 0;
	top: 0;
	
	min-height: var(--navbar-height);
	max-height: var(--navbar-height);
	width: 100%;

	display: flex;
	justify-content: center;

	background: var(--optional-topbar-background);
	background-color: var(--topbar-background-color);
	border-bottom: 1px solid var(--padding-color);
}

#navbar-left,
#navbar-middle,
#navbar-right {
	top: 0;
	height: var(--navbar-height);

	display: inline-flex;
	justify-content: center;
	align-items: center;
	gap: var(--navbar-gap);
}

#navbar-left {
	left: var(--side-margins);
	position: absolute;
}

#navbar-middle {
	max-width: 50dvw;
}

#navbar-right {
	right: var(--side-margins);
	position: absolute;
}

.context-icon {
	height: calc(var(--navbar-height) * 0.7);
	width: calc(var(--navbar-height) * 0.7);
	border-radius: var(--guild-icon-radius);
}

.context-title {
	min-height: var(--navbar-height);
	max-height: var(--navbar-height);

	font-weight: 500;
	font-size: calc(var(--navbar-height) * .5);
	line-height: var(--navbar-height);
}

.navbar-item {
	color: var(--reply-text-color);
	background-color: transparent;
	border: none;
	cursor: pointer;
	padding: 0;

	transition: color 300ms;
	display: flex;
	align-items: center;
	height: var(--navbar-icon-size);
}

.navbar-item:hover {
	color: var(--primary-highlighted-color);
}

.navbar-item-icon {
	width: var(--navbar-icon-size);
	height: 100%;
}
</style>