<template>
  <dialog ref="dialog" class="modal" :class="props.obscure ? 'modal-obscure' : 'modal-regular'">
    <slot />
  </dialog>
</template>

<script lang="ts" setup>
import type { ModalProps } from '~/types/interfaces';

const props = defineProps<ModalProps>();
const dialog = ref<HTMLDialogElement>();

onMounted(() => {
  if (dialog.value) {
    dialog.value.showModal();

    // close the modal if you click outside of it
    dialog.value.addEventListener('click', (event) => {
      if (event.target === dialog.value) {
        dialog.value.close();
      }
    });

    if (props.onClose) dialog.value.addEventListener("close", props.onClose);
    if (props.onCancel) dialog.value.addEventListener("cancel", props.onCancel);
  }
});
</script>

<style scoped>
.modal {
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  /* preferably set these to 70dvh and 70dvw in your components, this is a failsafe if you forget */
  max-height: 90dvh;
	max-width: 90dvw;

	background-color: var(--modal-background-color);
  border-radius: var(--standard-radius);
  border-width: 0;
  padding: 0;

  /* completely transparent colour, fixes weird border radius stuff */
  background-color: #b00b1e00; 
}

.modal-regular::backdrop {
	background-color: var(--chat-background-color);
	opacity: 10%;
}

.modal-obscure::backdrop {
	background-color: var(--chat-background-color);
	opacity: 80%;
}
</style>