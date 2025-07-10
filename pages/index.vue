<template>
  <NuxtLayout>

  </NuxtLayout>
</template>

<script lang="ts" setup>
await navigateTo("/me/", { replace: true })

definePageMeta({
	layout: "client"
});

</script>

<style>

</style>