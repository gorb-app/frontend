<template>
	<ModalBase :obscure="true" :onClose="props.onFinish" :onCloseButton="props.onFinish">
		<div id="profile-container">
			<div id="profile-header">
				<div id="header-mask"></div>
				<Avatar :profile="props.profile" id="avatar"/>
			</div>

			<div id="profile-sub-header">
				<div id="display-name">{{ displayName }}</div>
				<div id="username-and-pronouns">
					{{ username }}
					<span v-if="pronouns">
						•
						{{ pronouns }}
					</span>
				</div>
				<!-- <div id="status">Status goes here lorem ipsum or something</div> -->

				<div v-if="me.uuid != uuid" id="action-buttons-container">
					<Button text="Message" variant="normal" :callback="buttonSendMessage"></Button>
					<Button text="Friend" variant="neutral" :callback="buttonAddFriend"></Button>
				</div>
				<div v-else id="action-buttons-container">
					<Button text="Edit Profile" variant="normal" :callback="buttonEditProfile"></Button>
				</div>
			</div>
			<VerticalSpacer />

			<div v-if="aboutMe" id="profile-body">
				<div v-if="aboutMe" id="about-me-container">
					<div><Icon name="lucide:info" size="1.1em"/></div>
					<div id="about-me-text">
						{{ " " + aboutMe }}
					</div>
				</div>
			</div>
			<VerticalSpacer v-if="aboutMe" />

			<div id="profile-footer">
				<div id="dates">
					<div v-if="registrationDate" class="date-entry">
						<span class="date-entry-title">Registered at</span><br>
						<span class="date-entry-value" :title="registrationDate.toLocaleTimeString()">{{ toDateString(registrationDate) }}</span>
					</div>
					<div v-if="joinDate" class="date-entry">
						<span class="date-entry-title">Joined at</span><br>
						<span class="date-entry-value" :title="joinDate.toLocaleTimeString()">{{ toDateString(joinDate) }}</span>
					</div>
					<div v-if="friendsSince" class="date-entry">
						<span class="date-entry-title">Friends Since</span><br>
						<span class="date-entry-value" :title="friendsSince.toLocaleTimeString()">{{ toDateString(friendsSince) }}</span>
					</div>
				</div>
			</div>
		</div>
	</ModalBase>
</template>

<script lang="ts" setup>
import type { GuildMemberResponse, ModalProps, UserResponse } from '~/types/interfaces';
import VerticalSpacer from '../UserInterface/VerticalSpacer.vue';
import Button from '../UserInterface/Button.vue';

const { addFriend, fetchMe } = useApi();

const props = defineProps<ModalProps & {
	profile: GuildMemberResponse,
	onFinish: () => void
}>();

const friendsSinceRequest = await getFriendsSince(props.profile)
const me = await fetchMe() as UserResponse

const displayName = getDisplayName(props.profile)
const username = getUsername(props.profile)
const pronouns = getPronouns(props.profile)
const aboutMe = getAboutMe(props.profile)

const registrationDate = getRegistrationDate(props.profile)
const joinDate = getGuildJoinDate(props.profile)
const friendsSince = friendsSinceRequest

const uuid = getUuid(props.profile)


function toDateString(date: Date): string {
	return date.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })
}

function buttonSendMessage() {
	navigateTo(`/me/${uuid}`)
}

async function buttonAddFriend() {
	try {
		await addFriend(username)
		alert("sent!")
	} catch {
		alert("failed :(")
	}
}

function buttonEditProfile() {
	navigateTo(`/settings#profile`)
}
</script>

<style scoped>

#profile-container { 
	text-align: left;

	position: relative;
	max-height: 60dvh;
	max-width: 60dvw;
	height: 30em;
	width: 40em;

	display: flex;
	flex-direction: column;

	background-color: var(--chat-background-color);
	border-radius: var(--standard-radius);

	overflow-y: scroll;
}

#profile-header {
	flex-shrink: 0;
	min-height: 9em;
	width: 100%;
}

#header-mask {
	display: relative;
	width: 100%;
	min-height: 7em;

	z-index: 0;

	background-color: var(--primary-color);
	border-radius: var(--standard-radius) var(--standard-radius) 0 0; /* top left and top right */
}

#avatar {
	display: block;
	position: absolute;
	left: 2em;
	top: 2.5em;

	z-index: 1;

	width: 6em;
	height: 6em;

	border: .15em solid var(--accent-color);
}

#profile-sub-header {
	margin-left: 1em;
	margin-right: 1em;
}

#display-name {
	font-weight: 800;
	font-size: 2em;

}

#username-and-pronouns {
	font-size: .9em;
	color: var(--secondary-text-color);
}

#status {
	width: fit-content;
	margin-top: .75em;

	margin-left: -0.2em;
	padding: .3em .5em;
	
	background-color: var(--chatbox-background-color);
	border-radius: 1em;
}

#action-buttons-container {
	display: flex;
	gap: .6em;

	margin-top: .4em;
	margin-bottom: .3em;
}


#profile-body {
	margin-left: 1em;
	margin-right: 1em;
}

#about-me-container {
	display: flex;
	flex-direction: row;
	gap: .5em;

	margin-top: .75em;
	margin-bottom: .75em;
}

#about-me-text {
	display: inline;
	margin-top: -0.5em;
	
	align-self: center;

	font-size: .8em;
	font-weight: lighter;
}


#profile-footer {
	margin-left: 1em;
	margin-right: 1em;
	padding-bottom: 5em;
}

#dates {
	display: flex
}

.date-entry {
	flex-grow: 1;
}

.date-entry-title {
	font-size: .8em;
}
.date-entry-value {
	font-size: 1em;
}
</style>