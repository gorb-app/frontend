<template>
	<div class="message">
		<img class="message-author-pfp" :src="img" :alt="username">
		<div class="message-data">
			<div class="message-metadata">
				<span class="message-author-username">
					{{ username }}
				</span>
				<span class="message-date">
					{{ messageDate }}
				</span>
			</div>
			<div class="message-text">
				{{ text }}
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps<{ class?: string, img?: string, username: string, text: string, timestamp: number, format: "12" | "24" }>();

const messageDate = ref<string>();

const date = new Date(props.timestamp);
const now = new Date()

if (now.getUTCHours() >= 0) {
	let dateHour = date.getUTCHours();
	let dateMinute = date.getUTCMinutes();
	if (props.format == "12") {
		if (dateHour > 12) {
			dateHour = dateHour - 12;
		}
		messageDate.value = `${dateHour}:${dateMinute} ${dateHour > 0 && dateHour < 13 ? "AM" : "PM"}`
	} else {
		messageDate.value = `${dateHour}:${dateMinute}`
	}
}

</script>

<style scoped>
.message {
	text-align: left;
	/* border: 1px solid lightcoral; */
	margin-bottom: 1dvh;
	display: grid;
	grid-template-columns: 3em auto;
}

.message-metadata {
	display: flex;
	gap: .5dvw;
	align-items: center;
}

.message-data {
	/* border: 1px solid white; */
	margin-left: .5dvw;
}

.message-author {
	display: flex;
	align-items: center;
}

.message-author-pfp {
	margin-right: 1dvw;
	width: 3em;
}

.author-username {
	margin-right: .5dvw;
	color: white;
}

.message-date {
	font-size: small;
	color: rgb(150, 150, 150);
}
</style>