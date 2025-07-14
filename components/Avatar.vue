<template>
	<NuxtImg v-if="displayAvatar" 
		:src="displayAvatar"
		:alt="displayName" />
	<Icon v-else
		name="lucide:user"
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
let displayAvatar: string | null

const user = props.user || props.member?.user

if (user) {
	displayName = props.member?.nickname
						|| user.display_name
						|| user.username
	
	if (user.avatar) {
		displayAvatar = user.avatar
	} else if (!isCanvasBlocked()){
		displayAvatar = generateDefaultIcon(displayName, user.uuid)
	} else {
		displayAvatar = null
	}
}

</script>