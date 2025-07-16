<template>
  <dialog ref="dialog" class="modal" :class="props.obscure ? 'modal-obscure' : 'modal-regular'">
	<span class="modal-exit-button-container" style="position: absolute; right: 2em; top: .2em; width: .5em; height: .5em;">
		<Button text="X" variant="neutral" :callback="() => dialog?.remove()" />
	</span>
	<div class="modal-content">
		<h1 class="modal-title">{{ title }}</h1>
		<slot />
	</div>
  </dialog>
</template>

<script lang="ts" setup>
import type { ModalProps } from '~/types/interfaces';
import Button from '~/components/UserInterface/Button.vue';

const props = defineProps<ModalProps>();
const dialog = ref<HTMLDialogElement>();

console.log("props:", props);

onMounted(() => {
  if (dialog.value) {
    dialog.value.showModal();
    if (props.onClose) {
      dialog.value.addEventListener("close", props.onClose);
    }
    if (props.onCancel) {
      dialog.value.addEventListener("cancel", props.onCancel);
    }
  }
});


</script>

<style>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1em;
  opacity: 100%;
  padding: 1%;
  background-color: var(--sidebar-highlighted-background-color);
  color: var(--text-color);
  overflow: hidden;
}

.modal-regular::backdrop {
	background-color: var(--chat-background-color);
	opacity: 0%;
}

.modal-obscure::backdrop {
	background-color: var(--chat-background-color);
	opacity: 80%;
}

.modal-top-container {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.modal-title {
  font-size: 1.5rem;
  padding: 0;
}

.modal-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1em;
	margin: 1em;
	width: 100%;
}

</style>