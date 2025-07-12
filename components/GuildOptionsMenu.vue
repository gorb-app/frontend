<template>
  <div id="guild-options-container">
    <div v-for="setting of settings" class="guild-option" tabindex="0">
      <button class="guild-option-button" @click="setting.action" tabindex="0">{{ setting.name }}</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { render } from 'vue';
import InviteModal from './InviteModal.vue';

const settings = [
  { name: "Invite", icon: "lucide:letter", action: openInviteModal }
]

function openInviteModal() {
  const div = document.createElement("div");
  const guildId = useRoute().params.serverId as string;
  console.log("guild id:", guildId);
  const inviteModal = h(InviteModal, { guildId });
  document.body.appendChild(div);
  render(inviteModal, div);
}

</script>

<style>
#guild-options-container {
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: rgb(20, 20, 20);
  top: 8dvh;
  z-index: 10;
  width: 100%;
  position: absolute;
}

.guild-option {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5dvh;
}

.guild-option:hover {
  border: var(--outline-border);
}

.guild-option-button {
  border: 0;
  background-color: transparent;
  color: var(--main-text-color);
}
</style>