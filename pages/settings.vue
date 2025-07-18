<template>
  <div id="settings-page-container">
    <div id="settings-page">
      <div id="sidebar">
        <ul>
          <p>
            <span @click="$router.go(-1)">
              <Icon class="back-button" size="2em" name="lucide:circle-arrow-left" alt="Back"></Icon>
            </span>
          </p>
          <VerticalSpacer />

          <!-- categories and dynamic settings pages -->
          <div v-for="category in categories" :key="category.displayName">
            <h2>{{ category.displayName }}</h2>
            <li v-for="page in category.pages" :key="page.displayName" @click="selectCategory(page)"
              :class="{ 'sidebar-focus': selectedPage === page.displayName }">
              {{ page.displayName }}
            </li>
            <VerticalSpacer />
          </div>
          
          <p>
            <Button text="Log Out" :callback=logout variant="scary"></Button>
          </p>
          <VerticalSpacer />

          <p id="links-and-socials">
            <NuxtLink href="https://git.gorb.app/gorb/frontend" title="Source"><Icon name="lucide:git-branch-plus" /></NuxtLink>
            <NuxtLink href="https://docs.gorb.app" title="Backend Documentation"><Icon name="lucide:book-open-text" /></NuxtLink>
          </p>
          
          <p style="font-size: .8em; color: var(--secondary-text-color)">
            Version Hash: {{ appConfig.public.gitHash }}
            <br>
            Build Time: {{ appConfig.public.buildTimeString }}
          </p>
        </ul>
      </div>
      <div id="sub-page">
        <component :is="currentPage.pageData" />
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { Profile, Account, Privacy, Devices, Connections } from '~/components/Settings/UserSettings';
import { Appearance, Notifications, Keybinds, Language } from '~/components/Settings/AppSettings';

import VerticalSpacer from '~/components/UserInterface/VerticalSpacer.vue';
import Button from '~/components/UserInterface/Button.vue';


const { logout } = useAuth()
const appConfig = useRuntimeConfig()

interface Page {
  displayName: string;
  pageData: any; // is actually Component but TS is yelling at me :(
}
  
interface Category {
  displayName: string;
  pages: Page[];
}

const settingsCategories = {
  userSettings: {
    displayName: "User Settings",
    pages: [
      { displayName: "Profile", pageData: Profile },
      { displayName: "Account", pageData: Account },
      { displayName: "Privacy", pageData: Privacy },
      { displayName: "Devices", pageData: Devices },
      { displayName: "Connections", pageData: Connections },
    ]
  },
  appSettings: {
    displayName: "App Settings",
    pages: [
      { displayName: "Appearance", pageData: Appearance },
      { displayName: "Notifications", pageData: Notifications },
      { displayName: "Keybinds", pageData: Keybinds },
      { displayName: "Language", pageData: Language },
    ]
  },
};

const categories = Object.values(settingsCategories);

let currentPage = ref(categories[0].pages[0]);
let selectedPage = ref(currentPage.value.displayName); // used to highlight the current channel

function selectCategory(page: Page) {
  currentPage.value = page;
  selectedPage.value = page.displayName;
};

// redirects to you privacy if you go to settings#privacy
onMounted(() => {
  const hash = window.location.hash.substring(1).toLowerCase();
  const foundPage = categories.flatMap(category => category.pages).find(page => page.displayName.toLowerCase() === hash);

  if (foundPage) {
    currentPage.value = foundPage;
    selectedPage.value = foundPage.displayName;
  }
});
</script>

<style scoped>
#settings-page-container {
  height: 100%;
  align-content: center;
  overflow-y: hidden;
  margin: 0;
}

#settings-page {
  height: 100vh;
  display: flex;
}

#sidebar {
  min-width: 25dvw;
  max-width: 25dvw;
  background: var(--optional-channel-list-background);
  background-color: var(--sidebar-background-color);
  color: var(--text-color);
  padding: 1dvh 1dvw;
  margin-left: 0;

  overflow-y: auto;
  height: 100vh;
}

#sidebar h2 {
  font-size: 0.95em;
  padding: 0 0.8dvw;
}

#sidebar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

#sidebar li {
  border-radius: 8px;
  padding: 0.8dvh 0.8dvw;
  font-size: 1.4em;
  cursor: pointer;
  transition: background-color 0.3s;
}

#sidebar p {
  margin: 2dvh 0.8dvw;
}

.sidebar-focus {
  background-color: var(--sidebar-highlighted-background-color);
}

#sidebar li:hover {
  background-color: var(--sidebar-highlighted-background-color);
}

#sub-page {
  flex-grow: 1;
  min-width: 70dvw;
  max-width: 70dvw;
  padding-left: 1.5rem;
  margin-right: auto;

  overflow-y: auto;
  height: 100vh;
}

.back-button {
  cursor: pointer;
  color: var(--primary-color);
  transition: color 100ms;
}

.back-button:hover{
  color: var(--primary-highlighted-color);
}

#links-and-socials * {
  margin-right: 0.2em;
}

/* applies to child pages too */
:deep(.subtitle) {
  display: block;
  font-size: 0.8em;
  font-weight: 800;
  margin: 4dvh 0 0.5dvh 0.25dvw;
}
</style>