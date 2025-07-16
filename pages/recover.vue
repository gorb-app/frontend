<template>
  <NuxtLayout name="auth">
    <div v-if="errorValue">{{ errorValue }}</div>
      <form v-if="!emailFormSent" @submit.prevent="sendEmail">
        <div>
          <label for="identifier">Email or username</label>
            <br>
          <input type="text" name="identifier" id="identifier" v-model="emailForm.identifier">
        </div>
        <div>
          <Button type="submit" text="Send email" variant="normal" />
        </div>
      </form>
      <div v-else>
        If an account with that username or email exists, an email will be sent to it shortly.
      </div>
    <div v-if="registrationEnabled">
      Don't have an account? <NuxtLink :href="registerUrl">Register</NuxtLink> one!
    </div>
    <div>
      Already have an account? <NuxtLink :href="loginUrl">Log in</NuxtLink>!
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import Button from '~/components/UserInterface/Button.vue';

const emailForm = reactive({
  identifier: ""
});

const emailFormSent = ref(false);

const passwordForm = reactive({
  password: ""
});

const errorValue = ref<string>();

const registrationEnabled = ref<boolean>(true);
const apiBase = useCookie("api_base");

const query = useRoute().query as Record<string, string>;
const searchParams = new URLSearchParams(query);

const token = ref(searchParams.get("token"))
searchParams.delete("token");
const { resetPassword } = useApi();

const registerUrl = `/register?${searchParams}`;
const loginUrl = `/login?${searchParams}`;

if (apiBase.value) {
	console.log("apiBase:", apiBase.value);
	const stats = await useApi().fetchInstanceStats(apiBase.value);
	if (stats) {
		registrationEnabled.value = stats.registration_enabled;
	}
}

const { sendPasswordResetEmail } = useApi();

async function sendEmail() {
  try {
    await sendPasswordResetEmail(emailForm.identifier);
    emailFormSent.value = true;
  } catch (error) {
    errorValue.value = (error as any).toString();
  }
}

async function sendPassword() {
  try {
    console.log("pass:", passwordForm.password);
    const hashedPass = await hashPassword(passwordForm.password)
    console.log("hashed pass:", hashedPass);
    await resetPassword(hashedPass, token.value!);
    return await navigateTo(`/login?${searchParams}`);
  } catch (error) {
    errorValue.value = (error as any).toString();
  }
}

</script>

<style>

</style>