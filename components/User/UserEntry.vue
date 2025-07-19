<template>
    <NuxtLink class="user-item" :href="`/me/${user.uuid}`" tabindex="0">
        <Avatar :user="props.user" class="user-avatar"/>

        <span class="user-display-name">{{ getDisplayName(props.user) }}</span>
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
    
    text-decoration: none;
    color: inherit;
}

.user-item:hover {
    background-color: #00000020
}

.user-avatar {
    min-width: 2.3em;
    max-width: 2.3em;
    min-height: 2.3em;
    max-height: 2.3em;
}

.user-display-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
