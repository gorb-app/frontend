<template>
  <div>
	<Loading v-if="loading" />
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>

const loading = useState("loading");

</script>

<style>
html,
body {
  font-family: Arial, Helvetica, sans-serif;
  box-sizing: border-box;
  color: rgb(190, 190, 190);
  background-color: rgb(30, 30, 30);
  height: 100%;
  margin: 0;
}

a {
  color: aquamarine;
}

.white {
	color: white;
}

.bottom-border {
	border-bottom: 1px solid rgb(70, 70, 70);
}

.left-border {
	border-left: 1px solid rgb(70, 70, 70);
}

.right-border {
	border-right: 1px solid rgb(70, 70, 70);
}

</style>
