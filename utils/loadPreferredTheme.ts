let themeLinkElement: HTMLLinkElement | null;

export default function loadPreferredTheme() {
  const currentTheme = settingsLoad().selectedThemeId ?? "dark"

  if (themeLinkElement) {
    themeLinkElement.href = getThemeUrl(currentTheme);
  } else {
    // create the theme link if one doesn't already exist
    useHead({
      link: [{
        id: "main-theme",
        rel: "stylesheet",
        href: getThemeUrl(currentTheme)
      }]
    })

    themeLinkElement = document.getElementById('main-theme') as HTMLLinkElement;
  }
}

function getThemeUrl(id: string): string {
  const runtimeConfig = useRuntimeConfig()
  const baseURL = runtimeConfig.app.baseURL;

  // this should preferrably use version hash, but that's not implemented yet
  return `${baseURL}themes/style/${id}.css?v=${runtimeConfig.public.buildTimeString}`
}