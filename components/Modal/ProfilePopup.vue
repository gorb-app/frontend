<template>
	<ModalBase :obscure="true">
		<div id="profile-container">
			<div id="profile-header">
				<div id="header-mask"></div>
				<Avatar :profile="props.profile" id="avatar"/>
			</div>
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

#profile-container { 
	position: relative;
	height: 75dvh;
	width: 75dvw;

	display: flex;
	flex-direction: column;
}

#profile-header {
	flex-shrink: 0;
	min-height: 9em;
	width: 100%;
}

#header-mask {
	display: relative;
	width: 100%;
	min-height: 7em;

	z-index: 0;

	background-color: var(--primary-color);
	border-radius: var(--standard-radius) var(--standard-radius) 0 0; /* top left and top right */
}

#avatar {
	display: block;
	position: absolute;
	left: 5.5em;
	top: 3.5em;

	z-index: 1;

	width: 7em;
	height: 7em;

	border: .375em solid var(--accent-color);
}
</style>