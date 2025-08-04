<template>
  <div>
    <h1>Appearance</h1>
    
    <h2>Themes</h2>
    <div class="themes">
      <p class="subtitle">STYLES</p>
      <div class="styles">
        <div v-for="style of styles" class="theme-preview-container">
          <div class="theme-instance" :title="style.displayName">
            <div class="theme-content-container">
              <span class="style-background"
                :style="{background:`linear-gradient(${style.previewGradient})`}"
              ></span>
              <span class="theme-title" :style="{color:`${style.complementaryColor}`}">
                {{ style.displayName }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <p class="subtitle">LAYOUTS</p>
      <div class="layouts">
        <div v-for="layout of layouts" class="theme-preview-container">
          <div class="theme-instance" :title="layout.displayName">
            <div class="theme-content-container">
              <span class="layout-background"
                :style="{backgroundImage:`url(${layout.previewImageUrl})`}"
              ></span>
              <span class="theme-title" :style="{color:`${layout.complementaryColor}`}">
                {{ layout.displayName }}
              </span>
            </div>
          </div>
        </div>
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
const baseURL = runtimeConfig.app.baseURL;
const styleFolder = `${baseURL}themes/style`
const layoutFolder = `${baseURL}themes/layout`

const timeFormatTextStrings = ["Auto", "12-Hour", "24-Hour"]

interface Theme {
  displayName: string
  complementaryColor: string
  cssData: string
  previewGradient?: string
  previewImageUrl?: string
}

async function parseThemeCss(styleData: string): Promise<Theme | void> {
  const metadataMatch = styleData.match(/\/\*([\s\S]*?)\*\//);
  if (!metadataMatch) {
    alert(`Failed to fetch metadata for a theme, panicing`)
    return
  }

  const commentContent = metadataMatch[0].trim().split("\n");
  const cssData = styleData.substring(metadataMatch[0].length).trim();

  let displayName: string | undefined
  let complementaryColor: string | undefined
  let previewGradient: string | undefined
  let previewImageUrl: string | undefined

  for (const line of commentContent) {
    const line_array = line.split("=")
    if (line_array.length === 2) {
      switch (line_array[0].trim()) {
        case "displayName":
          displayName = line_array[1].trim()
          break
        case "complementaryColor":
          complementaryColor = line_array[1].trim()
          break
        case "previewGradient":
          previewGradient = line_array[1].trim()
          break
        case "previewImageUrl":
          previewImageUrl = `${layoutFolder}/${line_array[1].trim()}`
          break
      }
    }
  }
  
  console.log(displayName, complementaryColor, previewGradient, previewImageUrl, cssData)
  if (!(displayName && complementaryColor && cssData && (previewGradient || previewImageUrl))) {
    return
  }

  return {
    displayName,
    complementaryColor,
    cssData,
    previewGradient,
    previewImageUrl,
  }
}

async function parseThemeData(
  folder: string,
  incomingThemeList: Array<string>,
  outputThemeList: Array<Theme>) {
    for (const theme of incomingThemeList) {
      const themeData = await $fetch(`${folder}/${theme}`)
      const parsedThemeData = await parseThemeCss(themeData)
      
      if (parsedThemeData) {
        outputThemeList.push(parsedThemeData)
      }
    }
}

const styles: Array<Theme> = [];
const layouts: Array<Theme> = [];

const styleList: any = await $fetch(`${styleFolder}/styles.json`)
const layoutList: any = await $fetch(`${layoutFolder}/layouts.json`)

if (Array.isArray(styleList)) {
  await parseThemeData(styleFolder, styleList, styles)
}
if (Array.isArray(layoutList)) {
  await parseThemeData(layoutFolder, layoutList, layouts)
}

console.log(layouts)


function changeTheme(id: string, url: string) {
  settingSave("selectedThemeStyle", id)
  loadPreferredTheme()
}

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
  --instance-size: 5em;
}
.styles, .layouts {
  display: flex;
}

.theme-preview-container {
  margin: .5em;
  width: var(--instance-size);
  height: var(--instance-size);
}

.theme-instance {
  width: var(--instance-size);
  height: var(--instance-size);
  border-radius: 100%;
  border: .1em solid var(--primary-color);

  display: inline-block;
  cursor: pointer;
}

.theme-content-container {
  position: relative;

  text-align: center;
  align-content: center;
}

.style-background, .layout-background {
  position: absolute;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  width: var(--instance-size);
  height: var(--instance-size);

  border-radius: 100%;
}

.layout-background {
  background-size: cover;
  background-repeat: no-repeat;
  filter: brightness(35%);
}

.theme-title {
  position: absolute;
  
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  width: 100%;
  height: 100%;
  
  font-size: .8em;
  /* i CANNOT explain this line height calculation, but it works for a font size of .8em no matter what size the instances are */
  line-height: calc(var(--instance-size) * 1.25); 
}
</style>
