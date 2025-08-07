<template>
	<NuxtImg v-if="displayAvatar" 
		class="display-avatar"
		:src="displayAvatar"
		:alt="displayName" />
	<DefaultIcon v-else
		class="display-avatar"
		:name="displayName"
		:seed="user.uuid"
		:alt="displayName" />
</template>

<script lang="ts" setup>
import { NuxtImg } from '#components';
import type { GuildMemberResponse, UserResponse } from '~/types/interfaces';

const { getDisplayName } = useProfile()

const props = defineProps<{
	profile: UserResponse | GuildMemberResponse,
}>();

const displayName = getDisplayName(props.profile)
let user: UserResponse
let displayAvatar: string | null

if ("username" in props.profile) {
	// assume it's a UserResponse
	displayAvatar = props.profile.avatar
	user = props.profile
} else {
	// assume it's a GuildMemberResponse
	displayAvatar = props.profile.user.avatar
	user = props.profile.user
}

</script>

<style scoped>
.display-avatar {
	border-radius: var(--pfp-radius);
}
</style>
