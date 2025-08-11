<template>
  <div>
    <h1>Appearance</h1>
    
    <h2>Themes</h2>
    <div class="themes">
      <p class="subtitle">STYLES</p>
      <div class="styles">
        <div v-for="style of styles" class="theme-preview-container">
          <span class="theme-instance"
              :title="style.displayName"
              @click="changeTheme(StyleLayout.Style, style)">
            <div class="theme-content-container">
              <span class="style-background"
                :style="{background:`linear-gradient(${style.previewGradient})`}"
              ></span>
              <span class="theme-title" :style="{color:`${style.complementaryColor}`}">
                {{ style.displayName }}
              </span>
            </div>
          </span>
        </div>
      </div>
      <p class="subtitle">LAYOUTS</p>
      <div class="layouts">
        <div v-for="layout of layouts" class="theme-preview-container">
          <div class="theme-instance"
              :title="layout.displayName"
              @click="changeTheme(StyleLayout.Layout, layout)">
            <div class="theme-content-container">
              <span class="layout-background"
                :style="{backgroundImage:`url(${layout.previewImageUrl})`}"
              ></span>
              <span class="theme-title" :style="{color:`${layout.complementaryColor}`}">
                {{ layout.displayName }}
              </span>
              <!-- this breaks if it's a nuxtimg, i don't know why -->
              <img class="layout-preview" :src="layout.previewImageUrl"></img>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <p class="subtitle">Icons</p>
    <div class="icons">
    </div> -->
  </div>
</template>

<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig()
const baseURL = runtimeConfig.app.baseURL;
const styleFolder = `${baseURL}/themes/style`
const layoutFolder = `${baseURL}/themes/layout`

enum StyleLayout {
  Style,
  Layout
}

interface Theme {
  displayName: string
  complementaryColor: string
  cssData: string
  themeUrl: string
  previewGradient?: string
  previewImageUrl?: string
}

async function parseTheme(url: string): Promise<Theme | void> {
  const styleData: any = await $fetch(url)

  if (typeof styleData != "string") {
    return
  }

  const metadataMatch = styleData.match(/\/\*([\s\S]*?)\*\//);
  if (!metadataMatch) {
    alert(`Failed to fetch metadata for a theme, panicking`)
    return
  }

  const commentContent = metadataMatch[0].trim().split("\n");
  const cssData = styleData.substring(metadataMatch[0].length).trim();

  let displayName: string | undefined
  let complementaryColor: string | undefined
  let previewGradient: string | undefined
  let previewImageUrl: string | undefined

  for (const line of commentContent) {
    const lineArray = line.split("=")
    if (lineArray.length === 2) {
      switch (lineArray[0].trim()) {
        case "displayName":
          displayName = lineArray[1].trim()
          break
        case "complementaryColor":
          complementaryColor = lineArray[1].trim()
          break
        case "previewGradient":
          previewGradient = lineArray[1].trim()
          break
        case "previewImageUrl":
          previewImageUrl = `${layoutFolder}/${lineArray[1].trim()}`
          console.log(previewImageUrl)
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
    themeUrl: url,
    previewGradient,
    previewImageUrl,
  }
}

async function parseThemeLayout(
  folder: string,
  incomingThemeList: string[],
  outputThemeList: Theme[]) {
    for (const theme of incomingThemeList) {
      const parsedThemeData = await parseTheme(`${folder}/${theme}`)
      
      if (parsedThemeData) {
        outputThemeList.push(parsedThemeData)
      }
    }
}

const styles: Theme[] = [];
const layouts: Theme[] = [];

const styleList = await $fetch(`${styleFolder}/styles.json`)
const layoutList = await $fetch(`${layoutFolder}/layouts.json`)

if (Array.isArray(styleList)) {
  await parseThemeLayout(styleFolder, styleList, styles)
}
if (Array.isArray(layoutList)) {
  await parseThemeLayout(layoutFolder, layoutList, layouts)
}

function changeTheme(themeType: StyleLayout, theme: Theme) {
  if (themeType == StyleLayout.Style) {
    settingSave("selectedThemeStyle", theme.themeUrl)
  } else {
    settingSave("selectedThemeLayout", theme.themeUrl)
  }
  loadPreferredThemes()
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

.layout-preview {
  position: absolute;
  pointer-events: none;

  border: 0 solid var(--primary-color);
  transform: translate(0, calc(var(--instance-size) / 2));
  transition: all 250ms;

  height: 0;
  width: calc((height / 9) * 16);
  max-height: 40dvh;
}

.theme-instance:hover .layout-preview {
  border: .1em solid var(--primary-color);
  filter: drop-shadow(0 0 .2em var(--secondary-color));
  transform: translate(3.5em, -4em);
  
  height: 40dvw;
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
