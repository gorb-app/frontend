<template>
  <div>
    Hello
  </div>
</template>

<script lang="ts" setup>
const guild = await fetchWithApi(`/guilds/${useRoute().params.guildId}`);
console.log("guild:", guild);

</script>

<style>

</style>