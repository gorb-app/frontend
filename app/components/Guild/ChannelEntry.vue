<template>
  <div v-if="isCurrentChannel" class="channel-list-link-container rounded-corners current-channel" tabindex="0" :title="props.name">
	<NuxtLink class="channel-list-link" :href="props.href" tabindex="-1">
		# {{ props.name }}
	</NuxtLink>
  </div>
  <div v-else class="channel-list-link-container rounded-corners" tabindex="0" :title="props.name">
	<NuxtLink class="channel-list-link" :href="props.href" tabindex="-1">
		# {{ props.name }}
	</NuxtLink>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps<{ name: string, uuid: string, currentUuid: string, href: string }>();

const isCurrentChannel = props.uuid == props.currentUuid;

</script>

<style scoped>
.channel-list-link {
	text-decoration: none;
	color: inherit;
	padding-left: .25em;
	padding-right: .25em;
	overflow: hidden;
	text-overflow: ellipsis;
}

.channel-list-link-container {
	text-align: left;
	display: flex;
	height: 1.5em;
	white-space: nowrap;
	align-items: center;
}

.current-channel {
	background-color: var(--left-sidebar-highlighted-background-color);
}
</style>