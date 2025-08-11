<template>
  <div>
    <h1>Language</h1>

    <p class="subtitle">TIME FORMAT</p>
    <div class="icons">
      <RadioButtons
        :text-strings="timeFormatTextStrings"
        :default-button-key='settingsLoad().timeFormat ?? "Auto"'
        :callback="(index: number) => {settingSave('timeFormat', timeFormatTextStrings[index])}"
      />
    </div>

  </div>
</template>

<script lang="ts" setup>
import RadioButtons from '~/components/UserInterface/RadioButtons.vue';
import type { TimeFormat } from '~/types/settings';

const timeFormatTextStrings: TimeFormat[] = ["Auto", "4:18 PM", "16:18"]

</script>

<style scoped>

</style>