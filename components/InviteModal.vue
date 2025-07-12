<template>
  <Modal v-bind="props" :title="props.title || 'Create an invite'">
    <div id="invite-popup">
      <div v-if="invite">
        <p>{{ invite }}</p>
        <button @click="copyInvite">Copy Link</button>
      </div>
      <div v-else>
        <button @click="generateInvite">Generate Invite</button>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import type { InviteResponse, ModalProps } from '~/types/interfaces';

const props = defineProps<ModalProps & { guildId: string }>();

const invite = ref<string>();

const route = useRoute();

async function generateInvite(): Promise<void> {
  const chars = "ABCDEFGHIJKLMNOQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
  let randCode = "";
  for (let i = 0; i < 6; i++) {
    randCode += chars[Math.floor(Math.random() * chars.length)];
  }
  const createdInvite: InviteResponse | undefined = await fetchWithApi(
    `/guilds/${route.params.serverId}/invites`,
    { method: "POST", body: { custom_id: randCode } }
  );

  invite.value = createdInvite?.id;
  return;
}

function copyInvite() {
  const inviteUrl = URL.parse(`invite/${invite.value}`, `${window.location.protocol}//${window.location.host}`);
  navigator.clipboard.writeText(inviteUrl!.href);
}

</script>

<style>

</style>