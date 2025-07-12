<template>
  <div id="guild-options-container">
    <div v-for="setting of settings" class="guild-option" tabindex="0">
      <button class="guild-option-button" @click="setting.action">{{ setting.name }}</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { InviteModal } from '#components';

const modal = ref<HTMLDialogElement>();

const showInviteModal = ref(false);

const settings = [
  { name: "Invite", icon: "lucide:letter", action: openInviteModal }
]

function openInviteModal() {
  showInviteModal.value = true;
  const invitePopup = h(InviteModal);
}

function toggleInviteModal(e: Event) {
  e.preventDefault();
  showInviteModal.value = !showInviteModal.value;
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