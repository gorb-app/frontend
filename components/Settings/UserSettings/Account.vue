<template>
  <div>
    <h1>My Account</h1>

    <div class="profile-and-user-data-fields">
      <div class="user-data-fields">
        <p class="subtitle">AVATAR</p>
        <Button text="Change Avatar" :callback="changeAvatar" style="margin-right: 0.8dvw;"></Button>
        <Button text="Remove Avatar" :callback="removeAvatar" style="background-color: grey;"></Button>
        
        <label for="profile-display-name-input" class="subtitle">DISPLAY NAME</label>
        <input id="profile-display-name-input" class="profile-data-input" type="text" v-model="user.display_name" placeholder="Enter display name" />
        <label for="profile-username-input" class="subtitle">USERNAME</label>
        <input id="profile-username-input" class="profile-data-input" type="text" v-model="user.username" placeholder="Enter username" />
        <label for="profile-pronouns-input" class="subtitle">PRONOUNS</label>
        <input id="profile-pronouns-input" class="profile-data-input" type="text" v-model="user.pronouns" placeholder="Enter pronouns" />
        <label for="profile-about-me-input" class="subtitle">ABOUT ME</label>
        <input id="profile-about-me-input" class="profile-data-input" type="text" v-model="user.about" placeholder="About me" />

        <br>
        <Button style="margin-top: 1dvh" text="Save Changes" :callback="saveChanges"></Button>
      </div>

      <UserPopup :user=user class="profile-popup"></UserPopup>
    </div>

    <h2 style="margin-top: 8dvh">Password (and eventually authenticator)</h2>
    <Button text="Reset Password (tbd)" :callback=resetPassword></Button>

    <h2>Account Deletion</h2>
    <ButtonScary text="Delete Account (tbd)" :callback=deleteAccount></ButtonScary>

  </div>
</template>

<script lang="ts" setup>
import Button from '~/components/Buttons/Button.vue';
import ButtonScary from '~/components/Buttons/ButtonScary.vue';
import type { UserResponse } from '~/types/interfaces';

const { fetchUser } = useAuth();

const user_me = await fetchUser()
if (user_me === undefined) {
  alert("could not fetch user info, aborting :(")
}

let userReference = Object.assign({}, user_me)
const user: UserResponse = user_me!

let newPfpFile: any = null

const saveChanges = async () => {
  const formData = new FormData()
  
  if (newPfpFile !== null) {
    formData.append("avatar", newPfpFile)
  }
  
  const bytes = new TextEncoder().encode(JSON.stringify({
    display_name: user.display_name,
    username: user.username,
    pronouns: user.pronouns,
    about: user.about,
  }));
  formData.append('json', new Blob([bytes], { type: 'application/json' }));
  
  try {
    await fetchWithApi('/me', {
      method: 'PATCH',
      body: formData
    })

    userReference = Object.assign({}, await fetchUser())
    alert('success!!')
  } catch (error: any) {
    if (error?.response?.status !== 200) {
      alert(`error ${error?.response?.status} met whilst trying to update profile info`)
    }
  }
};


const removeAvatar = async () => {
  alert("TBD")
  // await fetchWithApi(`/auth/reset-password`);
}

const changeAvatar = async () => {
  let input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';

  input.addEventListener("change", (e: Event) => {
    if (input.files?.length && input.files.length > 0) {
      const file = input.files[0];
      if (!file) return;

      newPfpFile = file
      
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result && typeof e.target.result === 'string') {
          user.avatar = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  })

  input.click()
}

const resetPassword = async () => {
  alert("TBD")
  // await fetchWithApi(`/auth/reset-password`);
}

const deleteAccount = async () => {
  alert("TBD")
}
</script>

<style scoped>
.profile-and-user-data-fields {
  display: flex;
}

.subtitle {
  display: block;
  font-size: 0.8em;
  font-weight: 800;
  margin: 1.5dvh 0 0.5dvh 0.25dvw;
}

.user-data-fields {
  min-width: 35dvw;
  max-width: 35dvw;
}

.profile-data-input {
  min-width: 30dvw;
  margin: 2px;
  padding: 0.1dvh 0.7dvw;
  height: 2.5em;
  font-size: 1em;
  border-radius: 8px;
  border: none;
  color: white;
  background-color: #54361b;
}

.profile-popup {
  margin-left: 2dvw;
}
</style>