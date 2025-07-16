let themeLinkElement: HTMLLinkElement | null;

export default function loadPreferredTheme() {
  const runtimeConfig = useRuntimeConfig()
  const baseURL = runtimeConfig.app.baseURL;
  const currentTheme = settingsLoad().selectedThemeId ?? "dark"

  if (themeLinkElement && themeLinkElement.getAttribute('href') === `${baseURL}themes/${currentTheme}.css`) {
    return;
  }

  if (themeLinkElement) {
    themeLinkElement.href = `${baseURL}themes/${currentTheme}.css`;
  } else {
    // create the theme link if one doesn't already exist
    useHead({
      link: [{
        id: "main-theme",
        rel: "stylesheet",
        // this should preferrably use version hash, but that's not implemented yet
        href: `${baseURL}themes/${currentTheme}.css?v=${runtimeConfig.public.buildTimeString}`
      }]
    })

    themeLinkElement = document.getElementById('main-theme') as HTMLLinkElement;
  }
}