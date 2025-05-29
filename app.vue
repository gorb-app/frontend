<template>
  <div>
    <Banner v-if="banner" />
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>

const banner = useState("banner", () => false);

</script>

<style>
html,
body {
  font-family: Arial, Helvetica, sans-serif;
  box-sizing: border-box;
  color: rgb(190, 190, 190);
  background-color: rgb(30, 30, 30);
  margin: 0;
}

*:focus-visible {
	outline: 1px solid rgb(150, 150, 150);
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

.rounded-corners {
  border-radius: .3rem;
}

</style>
