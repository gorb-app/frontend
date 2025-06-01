<template>
  <div>
    <h1>My Account</h1>
    
    <div id="profile-container">
      <Userpopup :user=user_me></Userpopup>
    </div>

    <h2>Password (and eventually authenticator)</h2>
    <Button text="Reset Password (tbd)" :callback=resetPassword></Button> 

    <h2>Account Deletion</h2>
    <ButtonScary text="Delete Account (tbd)" :callback=deleteAccount></ButtonScary> 

  </div>
</template>

<script lang="ts" setup>
import Button from '~/components/buttons/Button.vue';
import ButtonScary from '~/components/buttons/ButtonScary.vue';

const { user, fetchUser } = useAuth();

const user_me = await fetchUser()


const resetPassword = async () => {
  alert("TBD")
  // await fetchWithApi(`/auth/reset-password`);
}

const deleteAccount = async () => {
  alert("TBD")
}
</script>

<style scoped>
#profile-container {
  border: 2px solid orange;
  min-width: 250px;
  min-height: 200px;
  padding: 8px;
  border-radius: 8px;
}
</style>