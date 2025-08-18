<template>
  <div id="invite-root">
	<div id="invite-container">
		<div id="guild-container" v-if="guild">
			<h1>You have been invited to {{ guild.name }}!</h1>
			<div id="guild-card">
				<div id="card-grid">
					<div id="guild-details">
						<div id="guild-name" title="Server name">
							<span>{{ guild.name }}</span>
						</div>
						<div id="guild-member-count" :title="`${guild.member_count} members`">
							<Icon name="lucide:users" />
							<span>{{ guild.member_count }}</span>
						</div>
					</div>
					<VerticalSpacer id="space" />
					<div id="guild-description">
						<span>{{ guild.description }}</span>
					</div>
					<div id="guild-icon">
						<NuxtImg v-if="guild.icon" id="guild-icon-img" :src="guild.icon" :alt="`${guild.name} server icon`" />
					</div>
				</div>
				<Button :text="isMember ? 'Joined' : 'Join'" variant="normal" :callback="acceptInvite" />
			</div>
		</div>
		<div v-else-if="errorMessage">
			<h1>{{ errorMessage }}</h1>
		</div>
	</div>
  </div>
</template>

<script lang="ts" setup>
import Button from '~/components/UserInterface/Button.vue';
import VerticalSpacer from '~/components/UserInterface/VerticalSpacer.vue';
import type { GuildResponse } from '~/types/interfaces';


const route = useRoute();
const { fetchInvite, joinGuild, fetchMembers } = useApi();
const { getUser } = useAuth();

const inviteId = route.params.inviteId as string;

const guild = ref<GuildResponse>();
const errorMessage = ref<string>();
const isMember = ref(false);

const accessToken = useCookie("access_token");

if (inviteId) {
	try {
		guild.value = await fetchInvite(inviteId);
		console.log("invite guild:", guild.value);
		if (accessToken.value && guild.value) {
			const members = await fetchMembers(guild.value.uuid);
			const me = await getUser();
			if (me && members.find(member => member.user.uuid == me.uuid)) {
				isMember.value = true;
			}
		} 
	} catch (error: any) {
		if (error.response) {
			if (error.status == 404) {
				errorMessage.value = "That invite doesn't exist or has expired.";
			}
		}
		console.error(error);
	}
}

async function acceptInvite() {
	if (accessToken.value && guild.value) {		
		await joinGuild(inviteId);
		return await navigateTo(`/servers/${guild.value.uuid}`);
	}

	return await navigateTo(`/login?redirect_to=${route.fullPath}`);
}

</script>

<style>

#invite-root {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100dvh;
}

#invite-container {
	border: .5rem solid var(--chat-highlighted-background-color);
	border-radius: var(--standard-radius);
	height: 50%;
	width: 50%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 50%;
	height: 60%;
}

#guild-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 50%;
	height: 60%;
}

#guild-card {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	background-color: var(--left-sidebar-highlighted-background-color);
	border: .5rem solid black;
	border-radius: var(--standard-radius);
	padding: .5rem;
}

#card-grid {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: 5rem auto 1fr;
	height: 100%;
	width: 100%;
}

#guild-details {
	grid-row: 1;
	grid-column: span 2;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

#guild-name {
	font-size: 2rem;
	flex-direction: column;
}

#guild-member-count {
	gap: .3rem;
}

#space {
	grid-row: 2;
	grid-column: span 3;
}

#guild-description {
	grid-row: 3;
	grid-column: span 3;
	word-break: break-all;
	padding: .3rem;
}

#guild-name, #guild-member-count {
	display: flex;
	justify-content: center;
	align-items: center;
}

#guild-icon-img {
	height: 100%;
	width: 100%;
	object-fit: scale-down;
}

</style>