<template>
  <div id="settings-page-container">
    <div id="settings-page">
      <div id="sidebar">
        <h4>Search bar here</h4>
        <ul>
          <template v-for="category in categories" :key="category.display_name">
            <h3>{{ category.display_name }}</h3>
            <ul>
              <li 
                v-for="page in category.pages" 
                :key="page.display_name" 
                @click="selectCategory(page)"
              >
                {{ page.display_name }}
              </li>
            </ul>
          </template>
        </ul>
      </div>
      <div id="sub_page">
        <component :is="currentPage.page_data"></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { NuxtTemplate } from 'nuxt/schema';
import { defineComponent, ref } from 'vue';

interface Page {
  display_name: string;
  page_data: any;
}

interface Category {
  display_name: string;
  pages: Page[];
}

import Account from '~/components/settings/user_settings/Account.vue';
import Appearance from '~/components/settings/app_settings/Appearance.vue';

const settingsCategories = {
  user_settings: {
    display_name: "User Settings",
    pages: [
      { display_name: "My Account", page_data: Account },
      { display_name: "Privacy", page_data: Account },
      { display_name: "Devices", page_data: Account },
      { display_name: "Connections", page_data: Account },
    ]
  },
  app_settings: {
    display_name: "App Settings",
    pages: [
      { display_name: "Appearance", page_data: Appearance },
      { display_name: "Notifications", page_data: Appearance },
      { display_name: "Keybinds", page_data: Appearance },
      { display_name: "Language", page_data: Appearance },
    ]
  },
};

export default defineComponent({
  setup() {
    const categories = Object.values(settingsCategories);

    let currentPage = ref(categories[0].pages[0]);

    const selectCategory = (page: Page) => {
      currentPage.value = page;
      console.log(`switching to ${page.display_name}`)
    };

    return {
      categories,
      selectCategory,
      currentPage
    };
  }
});
</script>

<style scoped>
#settings-page-container {
  height: 100vh;
  align-content: center;
  border: 2px solid purple;
}

#settings-page {
  height: 100vh;
  display: flex;
}

#sidebar {
  width: 200px;
  background-color: #2f3136;
  color: white;
  padding: 10px;
  margin-left: auto;
  border: 2px solid blue;
}

#sidebar h2 {
  font-size: 1.5em;
}

#sidebar ul {
  list-style-type: none;
  padding: 0;
}

#sidebar li {
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s;
}

#sidebar li:hover {
  background-color: #40444b;
}

#sub_page {
  flex-grow: 1;
  margin: 0 1rem;
  max-width: 600px;
  margin-right: auto;

  border: 2px solid red;
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