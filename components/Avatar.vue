<template>
	<NuxtImg v-if="displayAvatar" 
		class="display-avatar"
		:src="displayAvatar"
		:alt="displayName" />
	<DefaultIcon v-else-if="user"
		:name="displayName"
		:seed="user.uuid"
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
	displayName = getDisplayName(user, props.member)
	
	if (user.avatar) {
		displayAvatar = user.avatar
	}
}

</script>

<style scoped>
.display-avatar {
	border-radius: var(--pfp-radius);
}
</style>
