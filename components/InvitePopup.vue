<template>
  <div id="invite-popup">
    <div v-if="invite">
      <p>{{ invite }}</p>
      <button @click="copyInvite">Copy Link</button>
    </div>
    <div v-else>
      <button @click="generateInvite">Generate Invite</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { InviteResponse } from '~/types/interfaces';


const invite = ref<string>();

const route = useRoute();

async function generateInvite(): Promise<void> {
  const createdInvite: InviteResponse | undefined = await fetchWithApi(
    `/guilds/${route.params.serverId}/invites`,
    { method: "POST", body: { custom_id: "oijewfoiewf" } }
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