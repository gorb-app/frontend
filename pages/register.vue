<template>
  <NuxtLayout>
    <form v-if="registrationEnabled && !registrationSubmitted && !showEmailVerificationScreen" @submit="register">
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
	<div v-else-if="registrationEnabled && (registrationSubmitted || showEmailVerificationScreen) && !emailSent">
		<p v-if="emailVerificationRequired">
			This instance requires email verification to use it.
			<br><br>
			<span v-if="registrationSubmitted">
				Please open the link sent to your email.
			</span>
			<span v-else-if="showEmailVerificationScreen">
				Please click on the link you've already received, or click on the button below to receive a new email.
			</span>
		</p>
		<p v-else>
			Would you like to verify your email?
			<!--
			<br>
			This is required for resetting your password and making other important changes.
			-->
		</p>
		<Button v-if="(!emailVerificationRequired || showEmailVerificationScreen) && !emailSent" text="Send email" variant="neutral" :callback="sendEmail"></Button>
	</div>
	<div v-else-if="emailSent">
		<p>
			An email has been sent and should arrive soon.
			<br>
			If you don't see it in your inbox, try checking the spam folder.
		</p>
	</div>
    <div v-else>
      <h3>This instance has disabled registration.</h3>
    </div>
    <div v-if="loggedIn">
	  <Button text="Log out" variant="scary" :callback="() => {}"></Button>
	</div>
    <div v-else>
	  Already have an account? <NuxtLink :href="loginUrl">Log in</NuxtLink>!
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "auth"
});

const registrationEnabled = useState("registrationEnabled", () => true);
const emailVerificationRequired = useState("emailVerificationRequired", () => false);
const registrationSubmitted = ref(false);
const emailSent = ref(false);

const auth = useAuth();

const loggedIn = ref(await auth.getUser());

const query = new URLSearchParams(useRoute().query as Record<string, string>);
query.delete("token");

const user = await useAuth().getUser();

if (user?.email_verified) {
	if (query.get("redirect_to")) {
		await navigateTo(query.get("redirect_to"));
	} else {
		await navigateTo("/");
	}
}

const showEmailVerificationScreen = query.get("special") == "verify_email";
console.log("show email verification screen?", showEmailVerificationScreen);

const { fetchInstanceStats, sendVerificationEmail } = useApi();

console.log("wah");
console.log("weoooo")
const apiBase = useCookie("api_base");
console.log("apiBase:", apiBase.value);
if (apiBase.value) {
	const stats = await fetchInstanceStats(apiBase.value);
	if (stats) {
		registrationEnabled.value = stats.registration_enabled;
		console.log("set registration enabled value to:", stats.registration_enabled);
		emailVerificationRequired.value = stats.email_verification_required;
		console.log("set email verification required value to:", stats.email_verification_required);
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
	if (!emailVerificationRequired.value) {
		return await navigateTo(query.get("redirect_to"));
	}
	await sendVerificationEmail();
	registrationSubmitted.value = true;
  } catch (error) {
    console.error("Error registering:", error);
  }
  //return navigateTo(redirectTo ? redirectTo as string : useAppConfig().baseURL as string);
}

async function sendEmail() {
	await sendVerificationEmail();
	emailSent.value = true;
}

</script>

<style></style>