<template>
  <div id="fullscreen-container">
    <div id="crop-preview">
      <img ref="image" :src="imageSrc" style="min-height: 35dvh;">
      <Button text="Crop" :callback="cropImage"></Button>
      <Button text="Cancel" :callback="closePopup"></Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
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

      canvas.toBlob((blob) => {
        if (blob && props.onCrop) {
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            if (reader.result && typeof reader.result === 'string') {
              if (props.onCrop) {
                props.onCrop(blob, reader.result)
              }
            }
          });
          const file = new File([blob], 'preview.png', { type: 'image/png' })
          reader.readAsDataURL(file)
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
.button {
  margin: 0.2em
}

#fullscreen-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
}

#crop-preview {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
