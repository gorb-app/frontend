<template>
  <div id="profile-popup">
    <img v-if="props.user.avatar" id="avatar" :src="props.user.avatar" alt="profile avatar">
    <div id="cover-colour"></div>
    <div id="main-body">
      <p id="display-name"><strong>{{ props.user.display_name || "display_name" }}</strong></p>
      <p id="username"> {{ props.user.username || "username" }}</p>
      <div id="about-me">
        <span>About me</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { UserResponse } from '~/types/interfaces';

const { fetchMembers } = useApi();

const props = defineProps<{
	user: UserResponse,
}>();

</script>

<style scoped>
#profile-popup {
  min-width: 200px;
  max-width: 200px;
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
}

#cover-colour {
  border-radius: 8px 8px 0 0;
  min-height: 52px;
  background-color: #442505;
}

#main-body {
  border-radius: 0 0 8px 8px;
  padding: 8px;
  min-height: 180px;
  background-color: #4b3018;
  overflow-wrap: break-word;
  hyphens: manual;
}

#avatar {
  width: 64px;
  border: 4px solid #4b3018;
  border-radius: 100%;
  position: absolute;
  left: 12px;
  top: 12px;
}

#display-name {
  margin-top: 28px;
  margin-bottom: 0;
  font-size: 18px;
}

#username {
  margin-top: 2px;
  margin-bottom: 0;
  font-size: 12px;
}

#about-me {
  margin-top: 4px;
  padding: 4px;
  font-size: 14px;
}


</style>