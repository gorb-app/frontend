<template>
	<NuxtImg v-if="displayAvatar" 
		class="display-avatar"
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
	displayName = getDisplayName(props.member ?? user)
	
	if (user.avatar) {
		displayAvatar = user.avatar
	} else if (!isCanvasBlocked()){
		displayAvatar = generateDefaultIcon(displayName, user.uuid)
	} else {
		displayAvatar = null
	}
}

</script>

<style scoped>
.display-avatar {
	border-radius: var(--pfp-radius);
}
</style>
