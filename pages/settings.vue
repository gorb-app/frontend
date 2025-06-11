<template>
  <div id="settings-page-container">
    <div id="settings-page">
      <div id="sidebar">
        <h4>(Search bar here)</h4>
        <ul>
          <div v-for="category in categories" :key="category.display_name">
            <h2>{{ category.display_name }}</h2>
            <li v-for="page in category.pages" :key="page.display_name" @click="selectCategory(category, page)"
              :class="{ 'sidebar-focus': selectedPage === page.display_name }">
              {{ page.display_name }}
            </li>
            <span class="spacer"></span>
          </div>

          <ButtonScary text="Log Out" :callback=logout></ButtonScary>
        </ul>
      </div>
      <div id="sub_page">
        <component :is="currentPage.page_data" />
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue';
import ButtonScary from '~/components/Buttons/ButtonScary.vue';

const { logout } = useAuth()

interface Page {
  display_name: string;
  page_data: any; // is actually Component but TS is yelling at me :(
}

interface Category {
  display_name: string;
  pages: Page[];
}

import Account from '~/components/Settings/UserSettings/Account.vue';
import Privacy from '~/components/Settings/UserSettings/Privacy.vue';
import Devices from '~/components/Settings/UserSettings/Devices.vue';
import Connections from '~/components/Settings/UserSettings/Connections.vue';

import Appearance from '~/components/Settings/AppSettings/Appearance.vue';
import Notifications from '~/components/Settings/AppSettings/Notifications.vue';
import Keybinds from '~/components/Settings/AppSettings/Keybinds.vue';
import Language from '~/components/Settings/AppSettings/Language.vue';

const settingsCategories = {
  user_settings: {
    display_name: "User Settings",
    pages: [
      { display_name: "My Account", page_data: Account },
      { display_name: "Privacy", page_data: Privacy },
      { display_name: "Devices", page_data: Devices },
      { display_name: "Connections", page_data: Connections },
    ]
  },
  app_settings: {
    display_name: "App Settings",
    pages: [
      { display_name: "Appearance", page_data: Appearance },
      { display_name: "Notifications", page_data: Notifications },
      { display_name: "Keybinds", page_data: Keybinds },
      { display_name: "Language", page_data: Language },
    ]
  },
};

const categories = Object.values(settingsCategories);

let currentPage = ref(categories[0].pages[0]);
let selectedPage = ref(currentPage.value.display_name); // used to highlight the current channel

const selectCategory = (_category: Category, page: Page) => {
  currentPage.value = page;
  selectedPage.value = page.display_name;
};

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
  background-color: #2f3136;
  color: white;
  padding: 1dvh 1dvw;
  margin-left: auto;

  overflow-y: auto;
  height: 100vh;
}

#sidebar h2 {
  font-size: 0.8rem;
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
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.3s;
}

.sidebar-focus {
  background-color: #383B41;
}

#sidebar li:hover {
  background-color: #40444b;
}

#sub_page {
  flex-grow: 1;
  min-width: 70dvw;
  max-width: 70dvw;
  padding-left: 1.5rem;
  margin-right: auto;

  overflow-y: auto;
  height: 100vh;
}

.spacer {
  height: 2px;
  display: block;
  margin: 0.8dvh 1dvw;
  background-color: #2c2e32;
}

/* applies to child pages too */
:deep(h5) {
  color: red;
}
</style>