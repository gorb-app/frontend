<!--if you want a button with a different colour, you have to inline CSS or do something similar

    <Button text="Reset Password" :callback=reset_password style="color: purple; background-color: blue"></Button>

	if you have multiple buttons with the same style, feel free to make another component

    this is because i couldn't find a way of dynamically taking in colours without using javascript
	to update the colour during runtime, i REFUSE to do this due to performance -->

<template>
	<div id="button" @click="props.callback()">
		{{ props.text }}
	</div>
</template>

<script lang="ts" setup>
const props = defineProps<{
	text: string,
	callback: CallableFunction,
}>();

</script>

<style scoped>
#button {
	cursor: pointer;

	background-color: #b35719;
	color: #ffffff;

	padding: 8px 18px;
	font-size: 18px;
	transition: background-color 0.2s;

	border-radius: 12px;
	text-decoration: none;
	display: inline-block;
}

#button:hover {
	background-color: #934410;
}
</style>