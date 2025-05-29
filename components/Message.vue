<template>
	<div v-if="props.type == 'normal'" class="message normal-message" :class="{ 'message-margin-bottom': props.marginBottom }">
		<div class="left-column">
			<img v-if="props.img" class="message-author-avatar" :src="props.img" :alt="username">
			<Icon v-else name="lucide:user" class="message-author-avatar" />
		</div>
		<div class="message-data">
			<div class="message-metadata">
				<span class="message-author-username">
					{{ username }}
				</span>
				<span class="message-date" :title="date.toString()">
					{{ messageDate }}
				</span>
			</div>
			<div class="message-text">
				{{ text }}
			</div>
		</div>
	</div>
	<div v-else ref="messageElement" class="message compact-message">
		<div class="left-column">
			<div>
				<span :class="{ 'invisible': dateHidden }" class="message-date" :title="date.toString()">
					{{ messageDate }}
				</span>
			</div>
		</div>
		<div class="message-data">
			<div class="message-text">
				{{ text }}
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps<{
	class?: string,
	img?: string | null,
	username: string,
	text: string,
	timestamp: number,
	format: "12" | "24",
	type: "normal" | "compact",
	marginBottom: boolean
}>();

const messageDate = ref<string>();

const messageElement = ref<HTMLDivElement>();

const dateHidden = ref<boolean>(true);

const date = new Date(props.timestamp);

console.log("Message.vue: message:", props.text);
console.log("Message.vue: message type:", props.type);

let dateHour = date.getHours();
let dateMinute = date.getMinutes();
if (props.format == "12") {
	if (dateHour > 12) {
		dateHour = dateHour - 12;
		messageDate.value = `${dateHour}:${dateMinute < 10 ? "0" + dateMinute : dateMinute} PM`
	} else {
		if (dateHour == 0) {
			dateHour = 12;
		}
		messageDate.value = `${dateHour}:${dateMinute < 10 ? "0" + dateMinute : dateMinute} ${dateHour >= 0 && dateHour < 13 ? "AM" : "PM"}`
	}
} else {
	messageDate.value = `${dateHour}:${dateMinute < 10 ? "0" + dateMinute : dateMinute}`
}

onMounted(() => {
	messageElement.value?.addEventListener("mouseenter", (e: Event) => {
		console.log("mouse enter");
		dateHidden.value = false;
	});

	messageElement.value?.addEventListener("mouseleave", (e: Event) => {
		console.log("mouse leave");
		dateHidden.value = true;
	});
});

//function toggleTooltip(e: Event) {
//	showHover.value = !showHover.value;
//}

</script>

<style scoped>
.message {
	text-align: left;
	/* border: 1px solid lightcoral; */
	display: grid;
	grid-template-columns: 1fr 19fr;
	align-items: center;
}

.message-margin-bottom {
	margin-bottom: 1dvh;
}

.message-metadata {
	display: flex;
	gap: .5dvw;
	align-items: center;
}

.message-data {
	/* border: 1px solid white; */
	margin-left: .5dvw;
	display: flex;
	flex-direction: column;
	gap: 1dvh;
	height: 100%;
}

.message-author {
	display: flex;
	align-items: center;
}

.message-author-avatar {
	height: 2.3em;
	width: 2.3em;
	border-radius: 50%;
}

.left-column {
	margin-right: .5dvw;
	text-align: center;
	align-content: center;
}

.author-username {
	margin-right: .5dvw;
	color: white;
}

.message-date {
	font-size: .7em;
	color: rgb(150, 150, 150);
	cursor: default;
}

/*
.message-date-tooltip {
	height: 20px;;
	width: 20px;
}
*/
</style>