<template>
  <div id="profile-popup">
    <Avatar :profile="props.user" id="avatar"/>

    <div id="cover-color"></div>
    <div id="main-body">
      <p id="display-name">
        <strong>{{ getDisplayName(props.user) }}</strong>
      </p>
      <p id="username-and-pronouns">
        {{ props.user.username }}
        <span v-if="props.user.pronouns"> - {{ props.user.pronouns }}</span>
      </p>
      <div id="about-me" v-if="props.user.about">
        {{ props.user.about }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { UserResponse } from '~/types/interfaces';

const props = defineProps<{
	user: UserResponse
}>();

</script>

<style scoped>
#profile-popup {
  min-width: 300px;
  max-width: 300px;
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
}

#cover-color {
  border-radius: 12px 12px 0 0;
  min-height: 60px;
  background-color: var(--primary-color);
}

#main-body {
  border-radius: 0 0 12px 12px;
  padding: 12px;
  min-height: 280px;
  background-color: var(--accent-color);
  overflow-wrap: break-word;
  hyphens: manual;
}

#avatar {
  width: 96px;
  height: 96px;
  border: 5px solid #4b3018;
  background-color: var(--secondary-color);
  border-radius: 100%;
  position: absolute;
  left: 16px;
  top: 16px;
}


#display-name {
  margin-top: 60px;
  margin-bottom: 0;
  font-size: 28px;
}

#username-and-pronouns {
  margin: 2px;
  font-size: 16px;
}

#about-me {
  background-color: var(--secondary-color);
  border-radius: 12px;

  margin-top: 32px;
  padding: 16px;
  font-size: 16px;
}
</style>