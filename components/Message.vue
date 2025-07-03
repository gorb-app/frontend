<template>
	<div v-if="props.type == 'normal'" :id="props.last ? 'last-message' : undefined" class="message normal-message">
		<div class="left-column">
			<img v-if="props.img" class="message-author-avatar" :src="props.img" :alt="username" />
			<Icon v-else name="lucide:user" class="message-author-avatar" />
		</div>
		<div class="message-data">
			<div class="message-metadata">
				<span class="message-author-username" tabindex="0">
					{{ username }}
				</span>
				<span class="message-date" :title="date.toString()">
					<span v-if="getDayDifference(date, currentDate) === 1">Yesterday at</span>
					<span v-else-if="getDayDifference(date, currentDate) > 1 ">{{ date.toLocaleDateString(undefined) }},</span>
					{{ date.toLocaleTimeString(undefined, { timeStyle: "short" }) }}
				</span>
			</div>
			<div class="message-text" v-html="sanitized" tabindex="0"></div>
		</div>
	</div>
	<div v-else ref="messageElement" :id="props.last ? 'last-message' : undefined" class="message grouped-message" :class="{ 'message-margin-bottom': props.marginBottom }">
		<div class="left-column">
			<span :class="{ 'invisible': dateHidden }" class="message-date side-message-date" :title="date.toString()">
				{{ date.toLocaleTimeString(undefined, { timeStyle: "short" }) }}
			</span>
		</div>
		<div class="message-data">
			<div class="message-text" :class="$style['message-text']" v-html="sanitized" tabindex="0"></div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import DOMPurify from 'dompurify';
import { parse } from 'marked';

const props = defineProps<{
	class?: string,
	img?: string | null,
	username: string,
	text: string,
	timestamp: number,
	format: "12" | "24",
	type: "normal" | "grouped",
	marginBottom: boolean,
	last: boolean
}>();

const messageElement = ref<HTMLDivElement>();

const dateHidden = ref<boolean>(true);

const date = new Date(props.timestamp);
const currentDate: Date = new Date()

console.log("message:", props.text);
console.log("author:", props.username);

const sanitized = ref<string>();

onMounted(async () => {
	const parsed = await parse(props.text, { gfm: true });
	sanitized.value = DOMPurify.sanitize(parsed, { ALLOWED_TAGS: ["strong", "em", "br", "blockquote", "code", "ul", "ol", "li", "a", "h1", "h2", "h3", "h4", "h5", "h6"] });
	console.log("adding listeners")
	await nextTick();
	messageElement.value?.addEventListener("mouseenter", (e: Event) => {
		dateHidden.value = false;
	});

	messageElement.value?.addEventListener("mouseleave", (e: Event) => {
		dateHidden.value = true;
	});
	console.log("added listeners");
});

//function toggleTooltip(e: Event) {
//	showHover.value = !showHover.value;
//}

function getDayDifference(date_1: Date, date_2: Date) {
// Normalize both dates to midnight
    const midnight1 = new Date(date_1.getFullYear(), date_1.getMonth(), date_1.getDate());
    const midnight2 = new Date(date_2.getFullYear(), date_2.getMonth(), date_2.getDate());

    // Calculate the difference in time
    const timeDifference = midnight2.getTime() - midnight1.getTime();

    // Convert time difference from milliseconds to days
    const dayDifference = timeDifference / (1000 * 60 * 60 * 24);

    return Math.round(dayDifference); // Round to the nearest whole number
}

</script>

<style scoped>
.message {
	text-align: left;
	/* border: 1px solid lightcoral; */
	display: grid;
	grid-template-columns: 2rem 1fr;
	align-items: center;
	column-gap: 1dvw;
	width: 100%;
}

.message:hover {
	background-color: var(--chat-highlighted-background-color);
}

.normal-message {
	margin-top: 1dvh;
}

.grouped-message {
	margin-top: .3em;
}

#last-message {
	margin-bottom: 2dvh;
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
	height: fit-content;
	width: 100%;
}

.message-author {
	display: flex;
	align-items: center;
}

.message-author-avatar {
	width: 100%;
	border-radius: 50%;
}

.left-column {
	min-width: 2rem;
	display: flex;
	justify-content: center;
	text-align: center;
	white-space: nowrap;
}

.author-username {
	margin-right: .5dvw;
	color: white;
}

.message-date {
	font-size: .7em;
	color: var(--secondary-text-color);
	cursor: default;
}

.side-message-date {
	font-size: .625em;
	display: flex;
	align-items: center;
	align-content: center;
}

/*
.message-date-tooltip {
	height: 20px;;
	width: 20px;
}
*/
</style>

<style module>
.message-text ul, h1, h2, h3, h4, h5, h6 {
	padding-top: 1dvh;
	padding-bottom: 1dvh;
	margin: 0;
}

.message-text ul  {
	padding-left: 2dvw;
}
</style>
