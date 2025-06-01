<template>
  <div>
    <h1>My Account</h1>
    
    <div id="profile-container">

    </div>

    <h2>Password (and eventually authenticator)</h2>
    <Button text="Reset Password" :callback=resetPassword></Button> 

    <h2>Account Deletion</h2>
    <ButtonScary text="Delete Account" :callback=deleteAccount></ButtonScary> 

  </div>
</template>

<script lang="ts" setup>
import Button from '~/components/buttons/Button.vue';
import ButtonScary from '~/components/buttons/ButtonScary.vue';

const { user } = useAuth();


const resetPassword = async () => {
  alert("TBD")
  // await fetchWithApi(`/auth/reset-password`);
}

const deleteAccount = () => {
  alert("TBD")
}
</script>

<style scoped>

</style>