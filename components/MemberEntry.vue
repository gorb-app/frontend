<template>
    <div class="member-item" @click="togglePopup" @blur="hidePopup" tabindex="0">
        <img v-if="props.member.user.avatar" class="member-avatar" :src="props.member.user.avatar" :alt="props.member.user.display_name ?? props.member.user.username" />
        <Icon v-else class="member-avatar" name="lucide:user" />
        <span class="member-display-name">{{ props.member.user.display_name ?? props.member.user.username }}</span>
        <UserPopup v-if="isPopupVisible" :user="props.member.user" class="profile-popup" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { GuildMemberResponse } from '~/types/interfaces';
import UserPopup from './UserPopup.vue';

const props = defineProps<{
    member: GuildMemberResponse
}>();

const isPopupVisible = ref(false);

const togglePopup = () => {
    isPopupVisible.value = false;
    // isPopupVisible.value = !isPopupVisible.value;
};

const hidePopup = () => {
    isPopupVisible.value = false;
};
</script>

<style>
.member-item {
    position: relative; /* Set the position to relative for absolute positioning of the popup */
}

.profile-popup {
    position: absolute; /* Use absolute positioning */
    left: -100px; /* Adjust this value to position the popup to the left */
}
</style>
