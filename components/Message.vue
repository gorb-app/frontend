<template>
	<div class="message">
		<div>
			<img v-if="props.img" class="message-author-avatar" :src="img" :alt="username">
			<Icon v-else name="lucide:user" class="message-author-avatar" />
		</div>
		<div class="message-data">
			<div class="message-metadata">
				<span class="message-author-username">
					{{ username }}
				</span>
				<span class="message-date" :title="date.toString()">
					{{ messageDate }}
					<!--
					<div class="message-date-hover" v-if="showHover">
					</div>
					-->
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
const showHover = ref(false);

const date = new Date(props.timestamp);
const now = new Date()

if (now.getUTCHours() >= 0) {
	let dateHour = date.getUTCHours();
	let dateMinute = date.getUTCMinutes();
	if (props.format == "12") {
		if (dateHour > 12) {
			dateHour = dateHour - 12;
		}
		messageDate.value = `${dateHour}:${dateMinute < 10 ? "0" + dateMinute : dateMinute} ${dateHour > 0 && dateHour < 13 ? "AM" : "PM"}`
	} else {
		messageDate.value = `${dateHour}:${dateMinute < 10 ? "0" + dateMinute : dateMinute}`
	}
}

//function toggleTooltip(e: Event) {
//	showHover.value = !showHover.value;
//}

</script>

<style scoped>
.message {
	text-align: left;
	/* border: 1px solid lightcoral; */
	margin-bottom: 1dvh;
	display: grid;
	grid-template-columns: auto 1fr;
	align-items: center;
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

.message-author-avatar {
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

.message-date:hover {
	cursor: default;
}

/*
.message-date-tooltip {
	height: 20px;;
	width: 20px;
}
*/
</style>