<template>
  <dialog ref="dialog" class="modal">
    <h1 class="modal-title">{{ title }}</h1>
    <slot />
  </dialog>
</template>

<script lang="ts" setup>

const props = defineProps<{ title: string, heavy?: boolean }>();
const dialog = ref<HTMLDialogElement>();

onMounted(() => {
  if (dialog) {
    dialog.value?.showModal();
  }
});


</script>

<style>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  opacity: 100%;
  padding: 1%;
  background-color: var(--background-color);
  color: var(--main-text-color);
}

.modal::backdrop {
  background-color: rgb(50, 50, 50);
  opacity: 70%;
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
}
</style>