<template>
  <div>
    <h1>Profile</h1>

    <div class="profile-container">
      <div class="user-data-fields" v-if="user">
        <p class="subtitle">AVATAR</p>
        <Button text="Change Avatar" :callback="changeAvatar" style="margin-right: 0.8dvw;"></Button>
        <Button text="Remove Avatar" :callback="removeAvatar" variant="neutral"></Button>
        
        <label for="profile-display-name-input" class="subtitle">DISPLAY NAME</label>
        <input id="profile-display-name-input" class="profile-data-input" type="text" v-model="user.display_name" placeholder="Enter display name" />
        <label for="profile-username-input" class="subtitle">USERNAME</label>
        <input id="profile-username-input" class="profile-data-input" type="text" v-model="user.username" placeholder="Enter username" />
        <label for="profile-pronouns-input" class="subtitle">PRONOUNS</label>
        <input id="profile-pronouns-input" class="profile-data-input" type="text" v-model="user.pronouns" placeholder="Enter pronouns" />
        <label for="profile-about-me-input" class="subtitle">ABOUT ME</label>
        <input id="profile-about-me-input" class="profile-data-input" type="text" v-model="user.about" placeholder="About me" />

        <Button style="margin-top: 2dvh" text="Save Changes" :callback="saveChanges"></Button>
      </div>

      <UserPopup v-if="user" :user="user" id="profile-popup"></UserPopup>

    </div>
  </div>
  <CropPopup
    v-if="isCropPopupVisible"
    :imageSrc="cropImageSrc"
    :onCrop="handleCrop"
    :onClose="closeCropPopup"
  />
</template>

<script lang="ts" setup>
import type { UserResponse } from '~/types/interfaces';

let newPfpFile: File;
const isCropPopupVisible = ref(false);
const cropImageSrc = ref("")
;
const { fetchUser } = useAuth();

const user: UserResponse | undefined = await fetchUser()
if (!user) {
  alert("could not fetch user info, aborting :(")
}

async function saveChanges() {
  if (!user) return;
  
  const formData = new FormData()
  
  if (newPfpFile) {
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

    alert('success!!')
  } catch (error: any) {
    if (error?.response?.status !== 200) {
      alert(`error ${error?.response?.status} met whilst trying to update profile info\n"${error?.response._data?.message}"`)
    }
  }
};


async function removeAvatar() {
  alert("TBD")
  // await fetchWithApi(`/auth/reset-password`);
}

async function changeAvatar() {
  if (!user) return;

  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';

  input.addEventListener("change", (e: Event) => {
    if (input.files?.length && input.files.length > 0) {
      const file = input.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        if (reader.result && typeof reader.result === 'string') {
          cropImageSrc.value = reader.result;
          isCropPopupVisible.value = true;
        }
      });
      reader.readAsDataURL(file);
    }
  })

  input.click()
}


function handleCrop(blob: Blob, url: string) {
  if (!user) return;

  user.avatar = url;
  newPfpFile = new File([blob], 'avatar.png', { type: 'image/png' })
  closeCropPopup()
}

function closeCropPopup() {
  isCropPopupVisible.value = false
}
</script>

<style scoped>
.profile-container {
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
  margin: 0.07dvh;
  padding: 0.1dvh 0.7dvw;
  height: 2.5em;
  font-size: 1em;
  border-radius: 8px;
  border: none;
  color: var(--text-color);
  background-color: var(--accent-color);
}

#profile-popup {
  margin-left: 2dvw;
}
</style>