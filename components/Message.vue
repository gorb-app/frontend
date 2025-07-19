<template>
	<div v-if="props.type == 'normal' || props.replyMessage" ref="messageElement" @contextmenu="createContextMenu($event, menuItems)" :id="props.last ? 'last-message' : undefined"
			class="message normal-message" :class="{ 'mentioned': (props.replyMessage || props.isMentioned) && props.message.user.uuid != props.me.uuid && props.replyMessage?.user.uuid == props.me.uuid }" :data-message-id="props.messageId"
			:editing.sync="props.editing" :replying-to.sync="props.replyingTo">
		<div v-if="props.replyMessage" class="message-reply-svg">
			<svg
				width="1.5em" height="1.5em"
				viewBox="0 0 150 87.5" version="1.1" id="svg1"
				style="overflow: visible;">
				<defs id="defs1" />
				<g id="layer1"
					transform="translate(40,-35)">
					<g id="g3"
						transform="translate(-35,-20)">
					<path
						style="stroke:var(--reply-text-color);stroke-width:8;stroke-opacity:1"
						d="m 120.02168,87.850978 100.76157,2.4e-5"
						id="path3-5" />
					<path
						style="stroke:var(--reply-text-color);stroke-width:8;stroke-opacity:1"
						d="M 69.899501,174.963 120.2803,87.700931"
						id="path3-5-2" />
					</g>
				</g>
			</svg>
		</div>
		<MessageReply v-if="props.replyMessage" :id="props.message.uuid"
			:author="getDisplayName(props.replyMessage.user)"
			:text="props.replyMessage?.message"
			:reply-id="props.replyMessage.uuid" max-width="reply" />
		<div class="left-column">
			<Avatar :user="props.author" class="message-author-avatar"/>
		</div>
		<div class="message-data">
			<div class="message-metadata">
				<span class="message-author-username" tabindex="0" :style="`color: ${props.authorColor}`">
					{{ getDisplayName(props.author) }}
				</span>
				<span class="message-date" :title="date.toString()">
					<span v-if="getDayDifference(date, currentDate) === 1">Yesterday at</span>
					<span v-else-if="getDayDifference(date, currentDate) > 1 ">{{ date.toLocaleDateString(undefined) }},</span>

					{{ date.toLocaleTimeString(undefined, { hour12: props.format == "12", timeStyle: "short" }) }}
				</span>
			</div>
			<div class="message-text" v-html="sanitized" :hidden="hasEmbed" tabindex="0"></div>
		</div>
		<MessageMedia v-if="mediaLinks.length" :links="mediaLinks" />
	</div>
	<div v-else ref="messageElement" @contextmenu="createContextMenu($event, menuItems)" :id="props.last ? 'last-message' : undefined"
			class="message grouped-message" :class="{ 'message-margin-bottom': props.marginBottom, 'mentioned': props.replyMessage || props.isMentioned }"
			:data-message-id="props.messageId" :editing.sync="props.editing" :replying-to.sync="props.replyingTo">
		<div class="left-column">
			<span :class="{ 'invisible': dateHidden }" class="message-date side-message-date" :title="date.toString()">
				{{ date.toLocaleTimeString(undefined, { hour12: props.format == "12", timeStyle: "short" }) }}
			</span>
		</div>
		<div class="message-data">
			<div class="message-text" :class="$style['message-text']" v-html="sanitized" :hidden="hasEmbed" tabindex="0"></div>
		</div>
		<MessageMedia v-if="mediaLinks.length" :links="mediaLinks" />
	</div>
</template>

<script lang="ts" setup>
import DOMPurify from 'dompurify';
import { parse } from 'marked';
import type { MessageProps } from '~/types/props';
import MessageMedia from './MessageMedia.vue';
import MessageReply from './UserInterface/MessageReply.vue';

const props = defineProps<MessageProps>();

const messageElement = ref<HTMLDivElement>();

const dateHidden = ref<boolean>(true);

const date = new Date(props.timestamp);
const currentDate: Date = new Date()

console.log("[MSG] message to render:", props.message);
console.log("author:", props.author);
console.log("[MSG] reply message:", props.replyMessage);

const linkRegex = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/g;
const linkMatches = props.message.message.matchAll(linkRegex).map(link => link[0]);
const mediaLinks: string[] = [];
console.log("link matches:", linkMatches);

const hasEmbed = ref(false);

const sanitized = ref<string>();

onMounted(async () => {
	const parsed = await parse(props.text, { gfm: true });
	sanitized.value = DOMPurify.sanitize(parsed, {
		ALLOWED_TAGS: [
			"strong", "em", "br", "blockquote",
			"code", "ul", "ol", "li", "a", "h1",
			"h2", "h3", "h4", "h5", "h6"
		],
		ALLOW_DATA_ATTR: false,
		ALLOW_SELF_CLOSE_IN_ATTR: false,
		ALLOWED_ATTR: ["href"]
	});
	console.log("adding listeners")
	await nextTick();
	if (messageElement.value?.classList.contains("grouped-message")) {
		messageElement.value?.addEventListener("mouseenter", (e: Event) => {
			dateHidden.value = false;
		});
	
		messageElement.value?.addEventListener("mouseleave", (e: Event) => {
			dateHidden.value = true;
		});
		console.log("added listeners");
	}

	for (const link of linkMatches) {
	console.log("link:", link);
	try {
		const res = await $fetch.raw(link);
		if (res.ok && res.headers.get("content-type")?.match(/^image\/(apng|gif|jpeg|png|webp)$/)) {
			console.log("link is image");
			mediaLinks.push(link);
		}
		if (mediaLinks.length) {
			hasEmbed.value = true
			setTimeout(() => {
				scrollToBottom(document.getElementById("messages") as HTMLDivElement);
			}, 500);
		};
	} catch (error) {
		console.error(error);
	}
}

console.log("media links:", mediaLinks);
});

//function toggleTooltip(e: Event) {
//	showHover.value = !showHover.value;
//}

const menuItems = [
	{ name: "Reply", callback: () => { if (messageElement.value) replyToMessage(messageElement.value, props) } }
]

console.log("me:", props.me);
if (props.author?.uuid == props.me.uuid) {
	menuItems.push({ name: "Edit", callback: () => { if (messageElement.value) editMessage(messageElement.value, props) } });
}

function getDayDifference(date1: Date, date2: Date) {
    const midnight1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const midnight2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

    const timeDifference = midnight2.getTime() - midnight1.getTime();

    const dayDifference = timeDifference / (1000 * 60 * 60 * 24);

    return Math.round(dayDifference);
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
	overflow-wrap: anywhere;
}

.message-reply-preview {
	grid-row: 1;
	grid-column: 2;
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
	grid-row: 2;
	grid-column: 2;
}

.message-author {
	display: flex;
	align-items: center;
}

.message-author-avatar {
	min-height: 2em;
	max-height: 2em;
	min-width: 2em;
	max-width: 2em;
}

.left-column {
	min-width: 2rem;
	display: flex;
	justify-content: center;
	text-align: center;
	white-space: nowrap;
	grid-row: 2;
	grid-column: 1;
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

.mentioned {
	background-color: rgba(0, 255, 166, 0.123);
}

.mentioned:hover {
	background-color: rgba(90, 255, 200, 0.233);
}

.message-reply-svg {
	display: flex;
	justify-content: center;
}

</style>

<style module>
.message-text ul, h1, h2, h3, h4, h5, h6 {
	padding-top: .5em;
	padding-bottom: .5em;
	margin: 0;
}

.message-text ul  {
	padding-left: 1em;
}
</style>
