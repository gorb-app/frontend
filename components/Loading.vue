<template>
  <div id="loading-container">
    <Icon name="lucide:loader-circle" id="loading-circle" />
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>

#loading-container {
	position: fixed;
	left: 50dvw;
	top: 50dvh;
	transform: translate(-50%, -50%);
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

#loading-circle {
	animation-name: spin;
	animation-duration: 1s;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
	font-size: 2rem;
}

</style>