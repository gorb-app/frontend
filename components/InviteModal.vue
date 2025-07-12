<template>
  <Modal v-bind="props" :title="props.title || 'Create an invite'">
    <div id="invite-popup">
      <div v-if="invite">
        <p id="invite-label">{{ invite }}</p>
        <button @click="copyInvite('link')">Copy Link</button>
        <button @click="copyInvite('code')">Copy Code</button>
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

function copyInvite(type: "link" | "code") {
  if (!invite.value) return;

  if (type == "link") {
    const inviteUrl = URL.parse(`invite/${invite.value}`, `${window.location.protocol}//${window.location.host}`);
    if (inviteUrl) {
      navigator.clipboard.writeText(inviteUrl.href);
    }
  } else {
    navigator.clipboard.writeText(invite.value);
  }
}

</script>

<style scoped>

#invite-label {
  text-align: center;
}

</style>