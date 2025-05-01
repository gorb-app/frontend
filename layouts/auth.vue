<template>
  <div id="main-container">
    <div id="auth-form-container">
      <slot />
    </div>
    <div v-if="accessToken">
      You're logged in!
      <button @click="logout">Log out</button>
    </div>
    <div v-if="res">
      Response:
      <p>
        {{ res }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>

const apiVersion = useRuntimeConfig().public.apiVersion;

const accessToken = useCookie("access_token");

const res = ref();

async function logout(e: Event) {
  e.preventDefault();
  accessToken.value = null;
  useCookie("refresh_token").value = null;
  res.value = await $fetch(`/api/v${apiVersion}/auth/revoke`, { credentials: "include" });
}

</script>

<style>
#main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#auth-form-container,
#auth-form-container form {
  display: flex;
  width: 50dvw;
  flex-direction: column;
  align-items: center;
  gap: 1em;
}

#auth-form-container form {
  text-align: left;
  margin-top: 10dvh;
}
</style>