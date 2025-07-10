<template>
  <NuxtLayout name="client">
	<DirectMessagesSidebar />
	<MessageArea channel-url="channels/01970e8c-a09c-76a0-9c98-80a43364bea7"/>

  </NuxtLayout>
</template>

<script lang="ts" setup>
import DirectMessagesSidebar from '~/components/Me/DirectMessagesSidebar.vue';

definePageMeta({
	layout: "client"
});

</script>

<style>

</style>