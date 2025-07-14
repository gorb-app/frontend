<template>
    <NuxtLink class="user-item" :href="`/me/${user.uuid}`" tabindex="0">
        <Avatar :user="props.user" class="user-avatar"/>

        <span class="user-display-name">{{ displayName }}</span>
	</NuxtLink>
</template>

<script lang="ts" setup>
import type { UserResponse } from '~/types/interfaces';

const props = defineProps<{
    user: UserResponse
}>();

const displayName = props.user.display_name || props.user.username
</script>

<style>
.user-item {
    display: flex;
	align-items: center;
	text-align: left;

	margin-top: .5em;
	margin-bottom: .5em;
	gap: .5em;
    
    text-decoration: none;
    color: inherit;
}

.user-item:hover {
    background-color: #00000020
}

.user-avatar {
    width: 2.3em;
    height: 2.3em;
    border-radius: 50%;
}
</style>
