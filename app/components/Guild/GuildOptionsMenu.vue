<template>
  <div id="guild-options-menu" class="destroy-on-click">
    <div v-for="setting of settings" class="guild-option" tabindex="0">
      <button class="guild-option-button" @click="setting.action" tabindex="0">{{ setting.name }}</button>
    </div>
  </div>
  <ModalInvite v-if="showInviteModal" :guild-id="guildId" />
</template>

<script lang="ts" setup>

const settings = [
  { name: "Invite", icon: "lucide:letter", action: openInviteModal }
]

const guildId = useRoute().params.serverId as string;
const showInviteModal = ref(false);

function openInviteModal() {
  showInviteModal.value = true;
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