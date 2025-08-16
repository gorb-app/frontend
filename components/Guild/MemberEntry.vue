<template>
    <div class="member-item" @click.prevent="showModalPopup" tabindex="0" @contextmenu="showContextMenu($event, menuSections)">
        <Avatar :profile="props.member" class="member-avatar"/>
        <span class="member-display-name" :style="`color: ${generateIrcColor(props.member.user.uuid)}`">
            {{ getDisplayName(props.member) }}
        </span>
    </div>
    <ModalProfilePopup v-if="modalPopupVisible" :profile="props.member"
        :onFinish="hideModalPopup" :keepalive="false" />
	<ModalConfirmation v-if="confirmationModal && confirmationModal.show" :action-name="confirmationModal.actionName"
		:target-name="getDisplayName(props.member)" :callback="confirmationModal.callback"
		:onClose="resetConfirmationModal" :onCancel="resetConfirmationModal" />
</template>

<script lang="ts" setup>
import { ModalProfilePopup } from '#components';
import type { GuildMemberResponse, IConfirmationModal } from '~/types/interfaces';

const { getDisplayName } = useProfile()

const props = defineProps<{
    member: GuildMemberResponse
}>();

const confirmationModal = ref<IConfirmationModal>();
const menuSections = await createMemberContextMenuItems(props.member, props.member.guild_uuid, confirmationModal);

const modalPopupVisible = ref<boolean>(false);


function showModalPopup() {
    modalPopupVisible.value = true
}

function hideModalPopup() {
    modalPopupVisible.value = false
}

function resetConfirmationModal() {
	console.log("[CONFIRM] resetting");
	if (confirmationModal) {
		confirmationModal.value = { show: false, actionName: "", callback: () => {} };
	}
}

</script>

<style>

.member-item {
	display: flex;
	margin-top: .5em;
	margin-bottom: .5em;
	gap: .5em;
	align-items: center;
	text-align: left;
	cursor: pointer;
}

.member-avatar {
    min-height: 2.3em;
	max-height: 2.3em;
	min-width: 2.3em;
	max-width: 2.3em;
}

.member-display-name {
	cursor: pointer;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
