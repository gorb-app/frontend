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
        {{ props.user.about.trim() }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { UserResponse } from '~/types/interfaces';

const { getDisplayName } = useProfile()

const props = defineProps<{
	user: UserResponse
}>();

</script>

<style scoped>
#profile-popup {
  min-width: 300px;
  max-width: 300px;
  height: fit-content;

  display: flex;
  flex-direction: column;
  position: relative;

  border-radius: calc(var(--standard-radius));
  box-shadow: 0 0 .25em .02em  var(--chat-highlighted-background-color);
}


#cover-color {
  border-radius: var(--standard-radius) var(--standard-radius) 0 0;
  min-height: 60px;
  background-color: var(--accent-color);
}

#main-body {
  border-radius: 0 0 var(--standard-radius) var(--standard-radius);
  padding: 12px;
  background-color: var(--modal-background-color);
  overflow-wrap: break-word;
  hyphens: manual;
}

#avatar {
  width: 96px;
  height: 96px;
	border: .15em solid var(--secondary-color);
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
  border-radius: var(--standard-radius);
  
  margin-top: 32px;
  padding: 16px;
  font-size: 16px;
  
  white-space: pre-line;
  line-height: 1;
  max-height: 7em; /* 7 x 1 */

  overflow-y: auto;
  overflow-x: hidden;
}
</style>