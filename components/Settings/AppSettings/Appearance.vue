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

    <p class="subtitle">ICONS</p>
    <div class="themes">
    </div>


  </div>
</template>

<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig()
const defaultThemes = runtimeConfig.public.defaultThemes
const baseURL = runtimeConfig.app.baseURL;
let themeLinkElement: HTMLLinkElement | null = null;

const themes: Array<Theme> = []

interface Theme {
  id: string
  displayName: string
  previewGradient: string
  complementaryColor: string
  themeUrl: string
}

function changeTheme(id: string, url: string) {
  if (themeLinkElement && themeLinkElement.getAttribute('href') === `${baseURL}themes/${url}`) {
    return;
  }

  localStorage.setItem("selectedTheme", id);

  // if the theme didn't originally load for some reason, create it
  if (!themeLinkElement) {
    themeLinkElement = document.createElement('link');
    themeLinkElement.rel = 'stylesheet';
    document.head.appendChild(themeLinkElement);
  }

  themeLinkElement.href = `${baseURL}themes/${url}`;
}

async function fetchThemes() {
  for (const theme of defaultThemes) {
    const themeConfig = await $fetch(`${baseURL}themes/${theme}.json`) as Theme
    themeConfig.id = theme

    themes.push(themeConfig)
  }
}

await fetchThemes()
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
