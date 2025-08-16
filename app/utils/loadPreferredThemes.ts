let styleLinkElement: HTMLLinkElement | null;
let layoutLinkElement: HTMLLinkElement | null;


export default () => {  
  const runtimeConfig = useRuntimeConfig()
  const baseURL = runtimeConfig.app.baseURL;

  let currentStyle = settingsLoad().selectedThemeStyle || (
    prefersLight()
      ? `${baseURL}themes/style/light.css`
      : `${baseURL}themes/style/dark.css`
  );

  let currentLayout = settingsLoad().selectedThemeLayout || `${baseURL}themes/layout/gorb.css`

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

function prefersLight(): boolean {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return true
  }

  return false
}