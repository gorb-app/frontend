<template>
  <NuxtLayout>
    <form @submit="login">
      <div>
        <label for="username">Username/Email</label>
        <br>
        <input type="text" name="username" id="username" v-model="form.username">
      </div>
      <div>
        <label for="password">Password</label>
        <br>
        <input type="password" name="password" id="password" v-model="form.password">
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
    <div>
      Don't have an account? <NuxtLink href="/register">Register</NuxtLink> one!
    </div>
    <div v-if="response">
      Response:
      <p>
        {{ response }}
      </p>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>

definePageMeta({
  layout: "auth"
})

const form = reactive({
  username: "",
  password: "",
});

const response = ref();

//const authStore = useAuthStore();
const accessToken = useCookie("access_token");
const refreshToken = useCookie("refresh_token");
const redirectTo = useRoute().query.redirect_to;

console.log("access token:", accessToken.value);
console.log("refresh token:", refreshToken.value);

onMounted(() => {
  console.log("accessToken:", accessToken.value);
  console.log("refreshToken:", refreshToken.value);

  if (accessToken.value) {
    //return navigateTo(redirectTo ? redirectTo as string : useAppConfig().baseURL as string);
  }
});

const apiVersion = useRuntimeConfig().public.apiVersion;

async function login(e: Event) {
  e.preventDefault();
  console.log("Sending login data");
  const hashedPass = await hashPassword(form.password);
  console.log("hashedPass:", hashedPass);
  //authStore.setAccessToken(accessToken);
  const res = await $fetch(`/api/v${apiVersion}/auth/login`, {
    method: "POST", body:
    {
      username: form.username, password: hashedPass
    }
  }) as { access_token: string, refresh_token: string };
  response.value = res;
  accessToken.value = res.access_token;
  console.log("set access token:", accessToken.value);
  const refreshToken = useCookie("refresh_token", { secure: true, httpOnly: false });
  refreshToken.value = res.refresh_token;
  //return navigateTo(redirectTo ? redirectTo as string : useAppConfig().baseURL as string);
}

</script>

<style></style>