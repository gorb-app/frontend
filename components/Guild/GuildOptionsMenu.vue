<template>
  <div id="guild-options-menu" class="destroy-on-click">
    <div v-for="setting of settings" class="guild-option" tabindex="0">
      <button class="guild-option-button" @click="setting.action" tabindex="0">{{ setting.name }}</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { render } from 'vue';
import InviteModal from '../Modals/InviteModal.vue';

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
#guild-options-menu {
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: var(--chat-background-color);
  top: 8dvh;
  z-index: 10;
  width: 100%;
  position: absolute;
}

.guild-option {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2em;
  box-sizing: border-box;
}

.guild-option:hover {
  background-color: var(--padding-color);
}

.guild-option-button {
  border: 0;
  background-color: transparent;
  color: var(--main-text-color);
  height: 100%;
  width: 100%;
}
</style>