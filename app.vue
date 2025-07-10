<template>
  <div>
    <Banner v-if="banner" />
    <div id="homebar">
			<div class="homebar-item">
				<marquee>
					gorb!!!!!
				</marquee>
			</div>
		</div>
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

const baseURL = useRuntimeConfig().app.baseURL;

useHead({
  link: [
    {
      rel: "stylesheet",
      href: `${baseURL}themes/${currentTheme}.css`
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
	background: var(--optional-chat-background);
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

#homebar {
	grid-row: 1;
	grid-column: 1 / -1;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	background: var(--optional-topbar-background);
	background-color: var(--topbar-background-color);
	padding-left: 5dvw;
	padding-right: 5dvw;

}

.homebar-item {
	width: 100dvw;
}

</style>
