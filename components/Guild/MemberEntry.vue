<template>
    <div class="member-item" @click.prevent="toggleModalPopup" tabindex="0">
        <Avatar :profile="props.member" class="member-avatar"/>
        <span class="member-display-name">{{ getDisplayName(props.member) }}</span>
    </div>
    <ModalProfilePopup v-if="modalPopupVisible"
        :profile="props.member"/>
</template>

<script lang="ts" setup>
import { ModalProfilePopup } from '#components';
import type { GuildMemberResponse } from '~/types/interfaces';

const props = defineProps<{
    member: GuildMemberResponse
}>();

const modalPopupVisible = ref<boolean>(false);

function toggleModalPopup() {
    modalPopupVisible.value = !modalPopupVisible.value
}
</script>

<style>
.member-item {
    position: relative;
}
</style>
