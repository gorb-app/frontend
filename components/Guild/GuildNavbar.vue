<template>
	<div id="navbar" class="navbar-row">
		<div id="channel-info" class="navbar-row">
			<!-- h1 to help screen readers -->
			<h1 id="channel-name">
				# {{ channel.name }}
			</h1>
			<span id="channel-description">
				{{ channel.description }}
			</span>
		</div>

		<div id="buttons" class="navbar-row">
			<a class="button" href="https://git.gorb.app/gorb/frontend">
				<Icon name="lucide:code-xml" title="Source"/>
			</a>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { INavbar } from '~/types/interfaces';

const props = defineProps<INavbar>();

</script>

<style scoped>
.navbar-row {
	display: flex;
	flex-direction: row;
}

#navbar {
	--font-size: calc(var(--navbar-height) * 0.45);
	--side-margins: calc(var(--font-size) * 0.5);
	
	min-height: var(--navbar-height);
	max-height: var(--navbar-height);
	width: 100%;

	background: var(--optional-topbar-background);
	background-color: var(--topbar-background-color);
	border-bottom: 1px solid var(--padding-color);
}

#channel-info {
	margin-left: var(--side-margins);
	gap: calc(var(--font-size) * 0.75);

	align-items: center;
}

#channel-name {
	font-size: var(--font-size);
	font-weight: 500;
}

#channel-description {
	font-size: calc(var(--font-size) * 0.8);
	text-overflow: ellipsis;

	/* TODO make new theme colour? unsure of it's name, this is good enough for now */
	color: var(--reply-text-color);
}

#buttons {
	margin-right: var(--side-margins);

	flex-grow: 1;
	align-items: center;
	justify-content: end;
}

.button {
	color: var(--secondary-text-color);
	right: 0;
}
</style>