<template>
  <div id="settings-page-container">
    <div id="settings-page">
      <div id="sidebar">
        <h4>(Search bar here)</h4>
        <ul>
          <template v-for="category in categories" :key="category.display_name">
            <h2>{{ category.display_name }}</h2>
            <li v-for="page in category.pages" :key="page.display_name" @click="selectCategory(category, page)"
              :class="{ 'sidebar-focus': selectedPage === page.display_name }">
              {{ page.display_name }}
            </li>
            <span class="spacer"></span>
          </template>

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
import ButtonScary from '~/components/buttons/ButtonScary.vue';

const { logout } = useAuth()

interface Page {
  display_name: string;
  page_data: any; // is actually Component but TS is yelling at me :(
}

interface Category {
  display_name: string;
  pages: Page[];
}

import Account from '~/components/settings/user_settings/Account.vue';
import Privacy from '~/components/settings/user_settings/Privacy.vue';
import Devices from '~/components/settings/user_settings/Devices.vue';
import Connections from '~/components/settings/user_settings/Connections.vue';

import Appearance from '~/components/settings/app_settings/Appearance.vue';
import Notifications from '~/components/settings/app_settings/Notifications.vue';
import Keybinds from '~/components/settings/app_settings/Keybinds.vue';
import Language from '~/components/settings/app_settings/Language.vue';

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
  app_settings2: {
    display_name: "App Settings",
    pages: [
      { display_name: "Appearance", page_data: Appearance },
      { display_name: "Notifications", page_data: Notifications },
      { display_name: "Keybinds", page_data: Keybinds },
      { display_name: "Language", page_data: Language },
    ]
  },
  app_settings3: {
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
  min-width: 200px;
  max-width: 200px;
  background-color: #2f3136;
  color: white;
  padding: 10px;
  margin-left: auto;

  overflow-y: auto;
  height: 100vh;
}

#sidebar h2 {
  font-size: 1.5em;
  padding: 0 8px;
}

#sidebar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

#sidebar li {
  border-radius: 8px;
  padding: 8px;
  margin: 2px 0;
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
  max-width: 600px;
  margin-left: 1.5rem;
  margin-right: auto;

  overflow-y: auto;
  height: 100vh;
}

.spacer {
  height: 2px;
  display: block;
  margin: 8px 10px;
  background-color: #2c2e32;
}

.setting-item {
  margin-bottom: 15px;
}
</style>

<!-- not scoped, these are used by children] -->
<style>
h5 {
  color: red;
}
</style>