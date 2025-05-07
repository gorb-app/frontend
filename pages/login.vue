<template>
  <NuxtLayout>
    <form @submit="formLogin">
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

//const authStore = useAuthStore();

const { login } = useAuth();

async function formLogin(e: Event) {
  e.preventDefault();
  console.log("Sending login data");
  await login(form.username, form.password, "Linux Laptop");
  //return navigateTo(redirectTo ? redirectTo as string : useAppConfig().baseURL as string);
}

</script>

<style></style>