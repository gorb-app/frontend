<template>
  <NuxtLayout>
    <form v-if="registrationEnabled" @submit="register">
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
        <label for="repeat-password">Repeat password</label>
        <br>
        <input type="password" name="repeat-password" id="repeat-password" v-model="form.repeatPassword">
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
    <div v-else>
      <h3>This instance has disabled registration.</h3>
    </div>
    <div>
      Already have an account? <NuxtLink :href="loginUrl">Log in</NuxtLink>!
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { StatsResponse } from '~/types/interfaces';
definePageMeta({
  layout: "auth"
})

const registrationEnabled = useState("registrationEnabled", () => true);

console.log("wah");
console.log("weoooo")
const apiBase = useCookie("api_base");
console.log("apiBase:", apiBase.value);
if (apiBase.value) {
	const { status, data, error } = await useFetch<StatsResponse>(`${apiBase.value}/stats`);
	if (status.value == "success" && data.value) {
		registrationEnabled.value = data.value.registration_enabled;
		console.log("set registration enabled value to:", data.value.registration_enabled);
	}
}

const form = reactive({
  username: "",
  email: "",
  password: "",
  repeatPassword: ""
});

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
const auth = useAuth();
const query = useRoute().query as Record<string, string>;
const searchParams = new URLSearchParams(query);
const loginUrl = `/login?${searchParams}`

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

async function register(e: Event) {
  e.preventDefault();
  console.log("Sending registration data");
  try {
    await auth.register(form.username, form.email, form.password);
    return await navigateTo(query.redirect_to);
  } catch (error) {
    console.error("Error registering:", error);
  }
  //return navigateTo(redirectTo ? redirectTo as string : useAppConfig().baseURL as string);
}

</script>

<style></style>