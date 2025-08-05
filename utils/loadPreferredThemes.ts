let styleLinkElement: HTMLLinkElement | null;
let layoutLinkElement: HTMLLinkElement | null;


export default function loadPreferredThemes() {
  const runtimeConfig = useRuntimeConfig()
  const baseURL = runtimeConfig.app.baseURL;
  
  const currentStyle = settingsLoad().selectedThemeStyle ?? `${baseURL}themes/style/dark.css`
  const currentLayout = settingsLoad().selectedThemeLayout ?? `${baseURL}themes/layout/gorb.css`

  if (styleLinkElement) {
    styleLinkElement.href = currentStyle;
  } else {
    createStyleHead("style-theme", currentStyle)
    styleLinkElement = document.getElementById('style-theme') as HTMLLinkElement;
  }

  if (layoutLinkElement) {
    layoutLinkElement.href = currentLayout;
  } else {
    createStyleHead("style-layout", currentLayout)
    layoutLinkElement = document.getElementById('style-layout') as HTMLLinkElement;
  }
}

// create a new theme link if one doesn't already exist
function createStyleHead(id: string, themeUrl: string) {
  useHead({
    link: [{
      id: id,
      rel: "stylesheet",
      href: themeUrl
    }]
  })
}