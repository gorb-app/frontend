<template>
  <div>
    <h1>Appearance</h1>
    
    <p class="subtitle">THEMES</p>
    <div class="themes">
      <p v-for="theme of themes">
        <span class="theme-preview" :title="theme.displayName" :style="{background:`linear-gradient(${theme.previewGradient})`}">
          <span class="theme-title" :style="{color:`${theme.complementaryColor}`}">
            {{ theme.displayName }}
          </span>
        </span>
      </p>
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

const themes: Array<Theme> = []

interface Theme {
  displayName: string
  previewGradient: string
  complementaryColor: string
  themeURL: string
}


const fetchThemes = async () => {
  for (const theme of defaultThemes) {
    const themeConfig = await fetch(`${baseURL}themes/${theme}.json`)
    const themeConfigJson = await themeConfig.json() as Theme
    themes.push(themeConfigJson)
  }
}

await fetchThemes()
</script>

<style scoped>
.theme-preview {
  min-width: 6em;
  min-height: 6em;
  border-radius: 100%;
  border: .1em solid var(--primary-color);

  display: inline-block;
  text-align: center;
  align-content: center;
}

.theme-title {
  font-size: .8em;
  line-height: 6em; /* same height as the parent to centre it vertically */
}
</style>
