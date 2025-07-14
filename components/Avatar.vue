<template>
	<Icon v-if="canvasBlocked"
		name="lucide:user" />
	<NuxtImg v-else 
		:src="displayAvatar"
		:alt="displayName" />
</template>

<script lang="ts" setup>
import { NuxtImg } from '#components';
import type { GuildMemberResponse, UserResponse } from '~/types/interfaces';

const props = defineProps<{
	user?: UserResponse,
	member?: GuildMemberResponse,
}>();


let displayName: string
let displayAvatar: string
let canvasBlocked = false

const user = props.user || props.member?.user

if (user) {
	displayName = props.member?.nickname
						|| user.display_name
						|| user.username
	
	if (user.avatar) {
		displayAvatar = user.avatar
	} else {
		displayAvatar = generateDefaultIcon(displayName, user.uuid)
	}
}

</script>