<template>
	<NuxtImg v-if="displayAvatar" 
		class="display-avatar"
		:src="displayAvatar"
		:alt="displayName" />
	<DefaultIcon v-else
		class="display-avatar"
		:name="displayName"
		:seed="getUserUuid(props.profile)"
		:alt="displayName" />
</template>

<script lang="ts" setup>
import { NuxtImg } from '#components';
import type { GuildMemberResponse, UserResponse } from '~/types/interfaces';

const { getDisplayName, getAvatarUrl, getUserUuid } = useProfile()

const props = defineProps<{
	profile: UserResponse | GuildMemberResponse,
}>();

const displayName = getDisplayName(props.profile)
const displayAvatar = getAvatarUrl(props.profile)

</script>

<style scoped>
.display-avatar {
	border-radius: var(--pfp-radius);
}
</style>
