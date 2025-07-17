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
	profile: UserResponse | GuildMemberResponse,
}>();

const displayName = getDisplayName(props.profile)
let displayAvatar: string | null


if ("username" in props.profile) {
	// assume it's a UserRespone
	displayAvatar = props.profile.avatar
	if (!displayAvatar) {
		if (!isCanvasBlocked()) {
			displayAvatar = generateDefaultIcon(displayName, props.profile.uuid)
		}
	}

} else {
	// assume it's a GuildMemberResponse
	displayAvatar = props.profile.user.avatar
	if (!displayAvatar) {
		if (!isCanvasBlocked()) {
			displayAvatar = generateDefaultIcon(displayName, props.profile.user_uuid)
		}
	}
}

</script>

<style scoped>
.display-avatar {
	border-radius: var(--pfp-radius);
}
</style>
