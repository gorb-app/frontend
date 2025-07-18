<template>
  <div>
    <h1>Appearance</h1>
    
    <p class="subtitle">THEMES</p>
    <div class="themes">
      <div v-for="theme of themes" class="theme-preview-container">
        <span class="theme-preview"
          :title="theme.displayName"
          :style="{background:`linear-gradient(${theme.previewGradient})`}"
          @click="changeTheme(theme.id, theme.themeUrl)"
        >
          <span class="theme-title" :style="{color:`${theme.complementaryColor}`}">
            {{ theme.displayName }}
          </span>
        </span>
      </div>
    </div>

    <!-- <p class="subtitle">Icons</p>
    <div class="icons">
    </div> -->

    <p class="subtitle">TIME FORMAT</p>
    <div class="icons">
      <RadioButtons :button-count="3" :text-strings="timeFormatTextStrings"
          :default-button-index="settingsLoad().timeFormat?.index ?? 0" :callback="onTimeFormatClicked"></RadioButtons>
    </div>
  </div>
</template>

<script lang="ts" setup>
import RadioButtons from '~/components/UserInterface/RadioButtons.vue';
import type { TimeFormat } from '~/types/settings';
import loadPreferredTheme from '~/utils/loadPreferredTheme';
import settingSave from '~/utils/settingSave';

const runtimeConfig = useRuntimeConfig()
const defaultThemes = runtimeConfig.public.defaultThemes
const baseURL = runtimeConfig.app.baseURL;
const timeFormatTextStrings = ["Auto", "12-Hour", "24-Hour"]

const themes: Array<Theme> = []

interface Theme {
  id: string
  displayName: string
  previewGradient: string
  complementaryColor: string
  themeUrl: string
}

function changeTheme(id: string, url: string) {
  settingSave("selectedThemeId", id)
  loadPreferredTheme()
}

async function fetchThemes() {
  for (const theme of defaultThemes) {
    const themeConfig = await $fetch(`${baseURL}themes/${theme}.json`) as Theme
    themeConfig.id = theme

    themes.push(themeConfig)
  }
}

await fetchThemes()

async function onTimeFormatClicked(index: number) {
  let format: "auto" | "12" | "24" = "auto"

  if (index == 0) {
    format = "auto"
  } else if (index == 1) {
    format = "12"
  } else if (index == 2) {
    format = "24"
  }

  const timeFormat: TimeFormat = {index, format}
  settingSave("timeFormat", timeFormat)
}
</script>

<style scoped>
.themes {
  display: flex;
}

.theme-preview-container {
  margin: .5em;
  width: 5em;
  height: 5em;
}

.theme-preview {
  width: 5em;
  height: 5em;
  border-radius: 100%;
  border: .1em solid var(--primary-color);

  display: inline-block;
  text-align: center;
  align-content: center;
  cursor: pointer;
}

.theme-title {
  font-size: .8em;
  line-height: 5em; /* same height as the parent to centre it vertically */
}
</style>
