<template>
	<ModalBase ref="modal" class="confirmation-modal" :obscure="true" :onClose="props.onClose" :onCancel="props.onCancel">
		<div class="confirmation-modal-body">
			<div>
				<h1 class="confirmation-modal-message">Are you sure you would like to {{ props.actionName.toLowerCase() }} {{ props.displayName }}?</h1>
			</div>
			<div class="confirmation-modal-buttons">
				<Button :variant="'normal'" :text="'Cancel'" @click="closeModal()" />
				<Button :variant="'scary'" :text="'Confirm'" :callback="props.callback()" />
			</div>
		</div>
	</ModalBase>
</template>

<script lang="ts" setup>
import Button from '../UserInterface/Button.vue';

const props = defineProps<{ actionName: string, displayName?: string, callback: CallableFunction, onClose: () => void, onCancel: () => void }>();

const modal = ref<{ close: () => void }>();

function closeModal() {
	const test = document.getElementsByClassName("confirmation-modal")[0];
	console.log("[CONFIRM] modal rah:", test);
	if (modal.value) {
		modal.value.close();
	}
}

</script>

<style>

.confirmation-modal-body {
	display: flex;
	flex-direction: column;
	background-color: var(--modal-background-color);
	align-items: center;
	text-align: center;
	padding: 1rem;
	color: var(--text-color);
	border: .1rem solid var(--primary-color);
}

.confirmation-modal-buttons {
	display: flex;
	gap: 1rem;
}

.confirmation-modal-message {
	font-size: 1.5em;
}

</style>