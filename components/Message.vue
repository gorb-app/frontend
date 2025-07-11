<template>
	<div v-if="props.type == 'normal' || props.replyMessage" ref="messageElement" @contextmenu="createContextMenu($event, menuItems)" :id="props.last ? 'last-message' : undefined"
			class="message normal-message" :class="{ 'mentioned': (props.replyMessage || props.isMentioned) && props.message.user.uuid != props.me.uuid && props.replyMessage?.user.uuid == props.me.uuid }" :data-message-id="props.messageId"
			:editing.sync="props.editing" :replying-to.sync="props.replyingTo">
		<MessageReply v-if="props.replyMessage" :author="props.replyMessage.user.display_name || props.replyMessage.user.username" :text="props.replyMessage?.message"
			:id="props.message.uuid" :reply-id="props.replyMessage.uuid" max-width="reply" />
		<div class="left-column">
			<img v-if="props.img" class="message-author-avatar" :src="props.img" :alt="author?.display_name || author?.username" />
			<Icon v-else name="lucide:user" class="message-author-avatar" />
		</div>
		<div class="message-data">
			<div class="message-metadata">
				<span class="message-author-username" tabindex="0">
					{{ author?.display_name || author?.username }}
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
	<div v-else ref="messageElement" @contextmenu="createContextMenu($event, menuItems)" :id="props.last ? 'last-message' : undefined"
			class="message grouped-message" :class="{ 'message-margin-bottom': props.marginBottom, 'mentioned': props.replyMessage || props.isMentioned }"
			:data-message-id="props.messageId" :editing.sync="props.editing" :replying-to.sync="props.replyingTo">
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
import type { MessageProps } from '~/types/props';

const props = defineProps<MessageProps>();

const messageElement = ref<HTMLDivElement>();

const dateHidden = ref<boolean>(true);

const date = new Date(props.timestamp);
const currentDate: Date = new Date()

console.log("[MSG] message to render:", props.message);
console.log("author:", props.author);
console.log("[MSG] reply message:", props.replyMessage);

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
		ALLOWED_ATTR: []
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
	width: 100%;
	border-radius: 50%;
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
