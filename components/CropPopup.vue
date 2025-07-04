<template>
  <div class="crop-popup">
    <img ref="image" :src="imageSrc" style="min-height: 500px;">
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
    const cropperCanvas = cropper.value.getCropperCanvas()
    const cropperSelection = cropper.value.getCropperSelection()
    
    if (cropperCanvas) {
      cropperCanvas.background = false
    }

    if (cropperSelection) {
      cropperSelection.precise = true
      cropperSelection.aspectRatio = 1
      cropperSelection.initialCoverage = 1
    }
  }
});

async function cropImage() {
  if (cropper) {
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
.crop-popup, #image-preview{
  min-width: 20dvw;
  min-height: 20dvh;
}

cropper-canvas {
  min-height: 500px;
}
</style>
