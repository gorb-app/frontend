<template>
  <div>
    <Banner v-if="banner" />
    <NuxtPage :keepalive="true" />
  </div>
</template>

<script lang="ts" setup>

const banner = useState("banner", () => false);

let currentTheme = "dark" // default theme
const savedTheme = localStorage.getItem("selectedTheme");
if (savedTheme) {
	currentTheme = savedTheme;
}

useHead({
  link: [
    {
      rel: "stylesheet",
      href: `/themes/${currentTheme}.css`
    }
  ]
})
</script>

<style>
html,
body {
  font-family: Arial, Helvetica, sans-serif;
  box-sizing: border-box;
  color: var(--text-color);
  background-color: var(--chat-background-color);
  margin: 0;
}

*:focus-visible {
	outline: var(--outline-border);
}

a {
  color: aquamarine;
}

.white {
	color: white;
}

.bottom-border {
	border-bottom: 1px solid var(--padding-color);
}

.left-border {
	border-left: 1px solid var(--padding-color);
}

.right-border {
	border-right: 1px solid var(--padding-color);
}

.rounded-corners {
  border-radius: .3rem;
}


.invisible {
	visibility: hidden;
}

</style>
