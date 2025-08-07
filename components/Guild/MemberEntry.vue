<template>
    <div class="member-item" @click.prevent="showModalPopup" tabindex="0" @contextmenu="showContextMenu($event, contextMenu, menuItems)">
        <Avatar :profile="props.member" class="member-avatar"/>
        <span class="member-display-name" :style="`color: ${generateIrcColor(props.member.user.uuid)}`">
            {{ getDisplayName(props.member) }}
        </span>
    </div>
    <ModalProfilePopup v-if="modalPopupVisible" :profile="props.member"
        :onFinish="hideModalPopup" :keepalive="false"/>
</template>

<script lang="ts" setup>
import { ModalProfilePopup } from '#components';
import type { ContextMenuInterface, GuildMemberResponse } from '~/types/interfaces';

const { getDisplayName } = useProfile()

const contextMenu = useState<ContextMenuInterface>("contextMenu", () => ({ show: false, pointerX: 0, pointerY: 0, items: [] }));

const props = defineProps<{
    member: GuildMemberResponse
}>();

const menuItems = await createMemberContextMenuItems(props.member, props.member.guild_uuid);

const modalPopupVisible = ref<boolean>(false);

function showModalPopup() {
    modalPopupVisible.value = true
}

function hideModalPopup() {
    modalPopupVisible.value = false
}
</script>

<style>

.member-item {
    position: relative;
}

.member-avatar {
    min-height: 2.3em;
	max-height: 2.3em;
	min-width: 2.3em;
	max-width: 2.3em;
}

.member-display-name {
	cursor: pointer;
}

</style>
