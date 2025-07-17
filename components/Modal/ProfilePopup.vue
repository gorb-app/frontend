<template>
	<ModalBase :obscure="true">
		<div id="vertical-container">
			<span id="cover-background"></span>
			<Avatar :profile="props.profile" id="pfp"/>
		</div>
	</ModalBase>
</template>

<script lang="ts" setup>
import type { GuildMemberResponse, ModalProps, UserResponse } from '~/types/interfaces';

const props = defineProps<ModalProps & {
	profile: GuildMemberResponse
}>();

</script>

<style scoped>

#vertical-container {
	display: flex;
	flex-direction: column;

	height: 75dvh;
	width: 75dvw;
}

#cover-background {
	width: 100%;
	min-height: 6em;
	max-height: 6em;

	background-color: var(--primary-color);
	/* top left and top right */
	border-radius: var(--standard-radius) var(--standard-radius) 0 0;
}

</style>