<template>
	<div id="navbar">
		<!--  -->
	</div>
</template>

<script lang="ts" setup>
import type { INavbar } from '~/types/interfaces';

const props = defineProps<INavbar>();

</script>

<style scoped>
#navbar {
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
}

#navbar-middle {
	max-width: 50dvw;
}

#navbar-right {
	right: var(--side-margins);
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