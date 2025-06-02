<template>
  <div>
    <input id="hidden-pfp-uploader" type="file" accept="image/*" style="display: none;">
    <h1>My Account</h1>

    <div class="profile-and-user-data-fields">
      <div class="user-data-fields">
        <h3 class="subtitle">AVATAR</h3>
        <Button text="Change Avatar" :callback="changeAvatar"></Button>
        <Button text="Remove Avatar" :callback="removeAvatar"
          style="margin-left: 10px; background-color: grey;"></Button>
        <h3 class="subtitle">DISPLAY NAME</h3>
        <input class="profile-data-input" type="text" v-model="user.display_name" placeholder="Enter display name" />
        <h3 class="subtitle">USERNAME</h3>
        <input class="profile-data-input" type="text" v-model="user.username" placeholder="Enter username" />
        <h3 class="subtitle">PRONOUNS</h3>
        <input class="profile-data-input" type="text" v-model="user.pronouns" placeholder="Enter pronouns" />
        <h3 class="subtitle">ABOUT ME</h3>
        <input class="profile-data-input" type="text" v-model="user.about" placeholder="About You" />

        <br>
        <br>
        <Button text="Save Changes" :callback="saveChanges"></Button>
      </div>
      <Userpopup :user=user_me class="profile"></Userpopup>
    </div>

    <!-- i love html -->
    <br>
    <br>
    <br>
    <br>

    <h2>Password (and eventually authenticator)</h2>
    <Button text="Reset Password (tbd)" :callback=resetPassword></Button>

    <h2>Account Deletion</h2>
    <ButtonScary text="Delete Account (tbd)" :callback=deleteAccount></ButtonScary>

  </div>
</template>

<script lang="ts" setup>
import Button from '~/components/buttons/Button.vue';
import ButtonScary from '~/components/buttons/ButtonScary.vue';

const { fetchUser } = useAuth();

const user_me = await fetchUser()
let user_reference = Object.assign({}, user_me)
const user = user_me!

let new_pfp_file: any = null

const saveChanges = async () => {
  try {
    const formData = new FormData()

    const upload_field = document.getElementById("hidden-pfp-uploader")
    if (upload_field.files?.length && upload_field.files.length > 0) {
      console.log(upload_field.files[0])
      formData.append("avatar", upload_field.files[0])
    }
    
    const bytes = new TextEncoder().encode(JSON.stringify({
        display_name: user.display_name,
        username: user.username,
        pronouns: user.pronouns,
    }));
    formData.append("json", new Blob([bytes], { type: "application/json" }));
    
    await fetchWithApi("/me", {
      method: "PATCH",
      body: formData
    })

    user_reference = Object.assign({}, await fetchUser())
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

  input.onchange = async (e) => {
    if (input.files?.length && input.files.length > 0) {
      const file = input.files[0];
      if (!file) return;

      new_pfp_file = file
      
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result && typeof e.target.result === 'string') {
          user.avatar = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

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
.profile-container {
  min-width: 250px;
  min-height: 200px;
  padding: 8px;
  border-radius: 8px;
}

.profile-and-user-data-fields {
  display: flex;
}

.profile-container,
.user-data-fields {
  min-width: 350px;
}

.subtitle {
  font-size: 14px;
  font-weight: 800;
  margin: 12px 0;
}

.profile-data-input {
  min-width: 300px;
  margin: 2px;
  padding: 2px 10px;
  height: 40px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  color: white;
  background-color: #54361b;
}
</style>