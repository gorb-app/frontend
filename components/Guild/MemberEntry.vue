<template>
    <div class="member-item" @click="togglePopup" @blur="hidePopup" tabindex="0">
        <Avatar :member="props.member" class="member-avatar"/>
        <span class="member-display-name">{{ props.member.user.display_name || props.member.user.username }}</span>
        <UserPopup v-if="isPopupVisible" :user="props.member.user" id="profile-popup" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { GuildMemberResponse } from '~/types/interfaces';

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
</style>
