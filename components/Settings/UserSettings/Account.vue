<template>
  <div v-if="user">
    <h1>Account</h1>

    <p class="subtitle">E-MAIL</p>
    <input id="profile-about-me-input" class="profile-data-input" type="text" v-model="user.email" placeholder="john@example.org" />
    <br>
    <Button text="Submit" :callback=changeEmail style="margin-top: .4em"></Button>
    
    <p class="subtitle">PASSWORD</p>
    <Button text="Reset Password" :callback=resetPassword></Button>
    
    <p class="subtitle">ACCOUNT DELETION</p>
    <Button text="Delete Account (tbd)" :callback=deleteAccount variant="scary"></Button>

  </div>
</template>

<script lang="ts" setup>
import Button from '~/components/Button.vue';
import type { UserResponse } from '~/types/interfaces';

const { fetchUser } = useAuth();

const user: UserResponse | undefined = await fetchUser()
if (!user) {
  alert("could not fetch user info, aborting :(")
}

async function changeEmail() {
  if (!user) return;


  const formData = new FormData()
  const bytes = new TextEncoder().encode(JSON.stringify({
    email: user.email,
  }));
  formData.append('json', new Blob([bytes], { type: 'application/json' }));
  
  try {
    await fetchWithApi('/me', {
      method: 'PATCH',
      body: formData
    })

	const apiBase = useCookie("api_base").value;

	if (apiBase) {
		const stats = await useApi().fetchInstanceStats(apiBase);
		if (stats.email_verification_required) {
			return window.location.reload();
		}
	}
    alert('success!!')
  } catch (error: any) {
    if (error?.response?.status !== 200) {
      alert(`error ${error?.response?.status} met whilst trying to update profile info`)
    }
  }
};


async function resetPassword () {
  await fetchWithApi("/auth/reset-password", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    query: {
      identifier: user?.username
    }
  });
}

async function deleteAccount() {
  alert("TBD")
}
</script>

<style scoped>
.user-data-fields {
  min-width: 35dvw;
  max-width: 35dvw;
}

.profile-data-input {
  min-width: 30dvw;
  margin: 0.07dvh;
  padding: 0.1dvh 0.7dvw;
  height: 2.5em;
  font-size: 1em;
  border-radius: 8px;
  border: none;
  color: var(--text-color);
  background-color: var(--accent-color);
}
</style>