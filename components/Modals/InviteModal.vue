<template>
	<Modal v-bind="props" :title="props.title || 'Create an invite'">
		<div v-if="invite" id="invite-body">
			<div id="invite-label">{{ invite }}</div>
			<div id="invite-buttons">
				<Button text="Copy as link" variant="neutral" :callback="() => copyInvite('link')" />
				<Button text="Copy as code" variant="neutral" :callback="() => copyInvite('code')" />
			</div>
		</div>
		<div v-else>
			<Button text="Generate Invite" variant="normal" :callback="generateInvite">Generate Invite</Button>
		</div>
	</Modal>
</template>

<script lang="ts" setup>
import type { InviteResponse, ModalProps } from '~/types/interfaces';
import Button from '~/components/UserInterface/Button.vue';

const props = defineProps<ModalProps & { guildId: string }>();

const invite = ref<string>();

async function generateInvite(): Promise<void> {
  const chars = "ABCDEFGHIJKLMNOQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
  let randCode = "";
  for (let i = 0; i < 6; i++) {
    randCode += chars[Math.floor(Math.random() * chars.length)];
  }
  const createdInvite: InviteResponse | undefined = await fetchWithApi(
    `/guilds/${props.guildId}/invites`,
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

#invite-body, #invite-buttons {
	display: flex;
	gap: 1em;
}

#invite-body {
	flex-direction: column;
}

#invite-label {
  text-align: center;
  color: aquamarine;
}

</style>