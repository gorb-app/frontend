<template>
  <div id="settings-page-container">
    <div id="settings-page">
      <div id="sidebar">
        <ul>
          <p>
            <button @click="$router.go(-1)">
              <Icon name="lucide:circle-arrow-left" alt="Back"></Icon>
            </button>
          </p>
          <span class="spacer"></span>

          <!-- categories and dynamic settings pages -->
          <div v-for="category in categories" :key="category.displayName">
            <h2>{{ category.displayName }}</h2>
            <li v-for="page in category.pages" :key="page.displayName" @click="selectCategory(page)"
              :class="{ 'sidebar-focus': selectedPage === page.displayName }">
              {{ page.displayName }}
            </li>
            <span class="spacer"></span>
          </div>
          
          <p>
            <Button text="Log Out" :callback=logout variant="scary"></Button>
          </p>
          <span class="spacer"></span>

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

import Profile from '~/components/Settings/UserSettings/Profile.vue';
import Account from '~/components/Settings/UserSettings/Account.vue';
import Privacy from '~/components/Settings/UserSettings/Privacy.vue';
import Devices from '~/components/Settings/UserSettings/Devices.vue';
import Connections from '~/components/Settings/UserSettings/Connections.vue';

import Appearance from '~/components/Settings/AppSettings/Appearance.vue';
import Notifications from '~/components/Settings/AppSettings/Notifications.vue';
import Keybinds from '~/components/Settings/AppSettings/Keybinds.vue';
import Language from '~/components/Settings/AppSettings/Language.vue';

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

#links-and-socials * {
  margin-right: 0.2em;
}

.spacer {
  height: 0.2dvh;
  display: block;
  margin: 0.8dvh 1dvw;
  background-color: var(--padding-color);
}

/* applies to child pages too */
:deep(.subtitle) {
  display: block;
  font-size: 0.8em;
  font-weight: 800;
  margin: 4dvh 0 0.5dvh 0.25dvw;
}
</style>