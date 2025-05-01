<template>
  <NuxtLayout>
    <form @submit="register">
      <div>
        <!--
        <span class="form-error" v-if="errors.username.length > 0">
          <p v-for="error of errors.username">
            {{ error }}
          </p>
        </span>
        -->
        <label for="username">Username</label>
        <br>
        <input type="text" name="username" id="username" v-model="form.username">
      </div>
      <div>
        <label for="email">Email</label>
        <br>
        <input type="email" name="email" id="email" v-model="form.email">
      </div>
      <div>
        <label for="password">Password</label>
        <br>
        <input type="password" name="password" id="password" v-model="form.password">
      </div>
      <div>
        <label for="repeat-password">Password</label>
        <br>
        <input type="password" name="repeat-password" id="repeat-password" v-model="form.repeatPassword">
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
    <div>
      Already have an account? <NuxtLink href="/login">Log in</NuxtLink>!
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
  email: "",
  password: "",
  repeatPassword: ""
});

const response = ref();

/*
const errorMessages = reactive({
  username: {
    invalidChars: "Username contains invalid characters!",
    tooShort: "Username must be at least 2 characters long!",
    tooLong: "Username must be at most 32 characters long!",
    empty: "Username must not be empty!"
  },
  email: {
    invalidChars: "Email contains invalid characters!",
    empty: "Email must not be empty!"
  },
  password: {
    tooShort: "Password must be at least 8 characters long!",
    missingSpecialChars: "Password must contain at least 1 special character!",
    empty: "Password must not be empty!"
  },
  repeatPassword: [] as { id: string, message: string }[],
});
*/

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

/*
watch(() => form.username, (newValue) => {
  console.log("username change:", newValue);
  if (!validateUsername(newValue)) {
    errors.username.push({ id: "invalidCharacters", message: "!" });
  }
  if (newValue.length < 2) {
    errors.username.push({ id: "tooShort", message: "" });
  } else if (newValue.length > 32) {
    errors.username.push({ id: "tooLong", message: "" });
  } else {
    for (const error of Object.entries(errors.username)) {
      console.log("error:", error);
      if (["tooShort", "tooLong"].includes(error[1].id)) {
        errors.username.splice(parseInt(error[0]), 1);
      }
    }
  }
});
*/

watch(() => form.email, (newValue) => {
  console.log("email change:", newValue);
});

watch(() => form.password, (newValue) => {
  console.log("password change:", newValue);
})

watch(() => form.repeatPassword, (newValue) => {
  console.log("repeat password change:", newValue);
})

const apiVersion = useRuntimeConfig().public.apiVersion;

async function register(e: Event) {
  e.preventDefault();
  console.log("Sending registration data");
  const hashedPass = await hashPassword(form.password);
  const res = await $fetch(`/api/v${apiVersion}/auth/register`, {
    method: "POST", body:
    {
      email: form.email, username: form.username, password: hashedPass
    }
  }) as { access_token: string, refresh_token: string };
  response.value = res;
  //authStore.setAccessToken(accessToken);
  accessToken.value = res.access_token;
  console.log("set access token:", accessToken.value);
  const refreshToken = useCookie("refresh_token", { secure: true, httpOnly: false });
  refreshToken.value = res.refresh_token;
  //return navigateTo(redirectTo ? redirectTo as string : useAppConfig().baseURL as string);
}

</script>

<style></style>