<template>
    <div class="member-item" @click.prevent="createProfileModal(props.member)" tabindex="0">
        <Avatar :profile="props.member" class="member-avatar"/>
        <span class="member-display-name">{{ getDisplayName(props.member) }}</span>
    </div>
</template>

<script lang="ts" setup>
import { ModalProfilePopup } from '#components';
import { render } from 'vue';
import type { GuildMemberResponse } from '~/types/interfaces';

const props = defineProps<{
    member: GuildMemberResponse
}>();

function createProfileModal(profile: GuildMemberResponse) {
	const div = document.createElement("div");
	const modal = h(ModalProfilePopup, {
		profile: profile
	});
	
	document.body.appendChild(div);
	render(modal, div);
}

</script>

<style>
.member-item {
    position: relative;
}
</style>
