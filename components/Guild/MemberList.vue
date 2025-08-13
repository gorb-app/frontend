<template>
	<ResizableSidebar
			width="14rem" min-width="5.5rem" max-width="30rem"
			border-sides="left" local-storage-name="membersListWidth">
		<div id="members-container">
			<div id="members-list">
				<MemberEntry v-for="member of members.objects" :member="member" tabindex="0"/>
			</div>
		</div>
	</ResizableSidebar>
</template>

<script lang="ts" setup>
import ResizableSidebar from "../UserInterface/ResizableSidebar.vue";
import MemberEntry from "./MemberEntry.vue";
import type { GuildResponse } from "~/types/interfaces";

const props = defineProps<{
    guild: GuildResponse
}>();

const { fetchMembers } = useApi();

// TODO implement paging
const members = await fetchMembers(props.guild.uuid)

</script>

<style scoped>
#members-container {
	background: var(--optional-member-list-background);

	padding-top: .5em;
	padding-bottom: .5em;
	max-height: calc(100% - 1em); /* 100% - top and bottom padding */
}

#members-list {
	display: flex;
	flex-direction: column;
	overflow-x: hidden;
	overflow-y: scroll;

	padding-left: .5em;
	padding-right: .5em;
}
</style>