<template>
  <div v-if="current" class="channel-list-link-container">
	<NuxtLink class="channel-list-link" :href="props.href">
		# {{ name }}
	</NuxtLink>
  </div>
  <div v-else class="channel-list-link-container current-channel">
	<NuxtLink class="channel-list-link" :href="props.href">
		# {{ name }}
	</NuxtLink>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps<{ name: string, href: string, current?: boolean }>();

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
}

.current-channel {
	background-color: rgb(70, 70, 70);
}
</style>