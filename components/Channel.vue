<template>
  <div>
	<a class="channel-list-link" :href="href">
		{{ name }}
	</a>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps<{ name: string, href: string }>();

</script>

<style scoped>
.channel-list-link {
	text-decoration: none;
	color: inherit;
}
</style>