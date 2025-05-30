<template>
  <div v-if="isCurrentChannel" class="channel-list-link-container rounded-corners current-channel">
	<NuxtLink class="channel-list-link" :href="props.href">
		# {{ props.name }}
	</NuxtLink>
  </div>
  <div v-else class="channel-list-link-container rounded-corners">
	<NuxtLink class="channel-list-link" :href="props.href">
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
	padding-left: .5dvw;
	padding-right: .5dvw;
}

.channel-list-link-container {
	text-align: left;
	display: flex;
	height: 4dvh;
	white-space: nowrap;
	align-items: center;
}

.current-channel {
	background-color: rgb(70, 70, 70);
}
</style>