<template>
  <NuxtLayout name="auth">
    <div v-if="errorValue">{{ errorValue }}</div>
    <form @submit.prevent="sendPassword">
      <div>
        <label for="password">Password</label>
        <br>
        <input type="password" name="password" id="password" v-model="passwordForm.password">
      </div>
      <div>
        <Button type="submit" text="Submit" variant="normal" />
      </div>
    </form>
	<div>
	  Already have an account? <NuxtLink :href="loginUrl">Log in</NuxtLink>!
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import Button from '~/components/UserInterface/Button.vue';

const query = useRoute().query as Record<string, string>;
const searchParams = new URLSearchParams(query);

const loginUrl = `/login?${searchParams}`;

const token = ref(searchParams.get("token"))

if (!token.value) await navigateTo("/login");

const passwordForm = reactive({
  password: ""
});

const errorValue = ref<string>();

const { resetPassword } = useApi();

async function sendPassword() {
  try {
    console.log("pass:", passwordForm.password);
    const hashedPass = await hashPassword(passwordForm.password)
    console.log("hashed pass:", hashedPass);
    await resetPassword(hashedPass, token.value!);
    return await navigateTo("/login?");
  } catch (error) {
    errorValue.value = (error as any).toString();
  }
}

</script>

<style>

</style>