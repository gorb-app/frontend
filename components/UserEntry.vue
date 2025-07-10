<template>
    <NuxtLink class="user-item" :href="`/me/${user.uuid}`" tabindex="0">
        <img v-if="props.user.avatar" class="user-avatar" :src="props.user.avatar" :alt="props.user.display_name ?? props.user.username" />
        <Icon v-else class="user-avatar" name="lucide:user" />
        <span class="user-display-name">{{ props.user.display_name || props.user.username }}</span>
	</NuxtLink>
</template>

<script lang="ts" setup>
import type { UserResponse } from '~/types/interfaces';

const props = defineProps<{
    user: UserResponse
}>();
</script>

<style>
.user-item {
    display: flex;
	align-items: center;
	text-align: left;

	margin-top: .5em;
	margin-bottom: .5em;
	gap: .5em;
    
	cursor: pointer;
}

.user-avatar {
    width: 2.3em;
    height: 2.3em;
    border-radius: 50%;
}
</style>
