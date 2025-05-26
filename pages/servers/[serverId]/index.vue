<template>
  <div>
    Hello
  </div>
</template>

<script lang="ts" setup>
const server = await fetchWithApi(`/servers/${useRoute().params.serverId}`);
console.log("server:", server);

</script>

<style>

</style>