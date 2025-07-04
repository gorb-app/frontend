<template>
  <div class="crop-popup">
    <div class="crop-container">
      <img ref="image" :src="imageSrc" alt="Picture">
    </div>
    <div class="image-preview"></div>
    <Button text="Crop" :callback="cropImage"></Button>
    <Button text="Cancel" :callback="closePopup"></Button>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import Cropper from 'cropperjs';

const props = defineProps({
  imageSrc: String,
  onCrop: Function,
  onClose: Function,
});

const image = ref<HTMLImageElement | null>(null);
const cropper = ref<Cropper | null>(null);

watch(image, (newValue) => {
  if (newValue) {
    cropper.value = new Cropper(newValue)
    const selection = cropper.value.getCropperSelection()
    if (selection) {
      selection.precise = true
      selection.aspectRatio = 1
      selection.initialCoverage = 1
    }
  }
});

async function cropImage() {
  if (cropper) {
    cropper.value?.element
    const selection = cropper.value?.getCropperSelection();
    if (selection) {
      const canvas = await selection.$toCanvas({width: 256, height: 256})
      console.log(canvas)
      canvas.toBlob((blob) => {
        if (blob && props.onCrop) {
          props.onCrop(blob);
        }
      });
    }
  }
}

function closePopup() {
  if (props.onClose) {
    props.onClose();
  }
}
</script>

<style scoped>
</style>
