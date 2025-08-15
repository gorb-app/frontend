<template>
	<div v-if="props.type == 'normal' || props.replyMessage" ref="messageElement" @contextmenu="showContextMenu($event, contextMenu, menuItems)"
			class="message normal-message" :class="{ 'highlighted': (props.isMentioned || (props.replyMessage && props.message.member.user.uuid != me!.uuid && props.replyMessage?.member.user.uuid == me!.uuid)) }"
			:data-message-id="props.message.uuid" :editing.sync="props.editing">
		<div v-if="props.replyMessage" class="message-reply-svg">
			<svg
				width="1.5em" height="1.5em"
				viewBox="0 0 150 87.5" version="1.1" id="svg1"
				style="overflow: visible;">
				<defs id="defs1" />
				<g id="layer1" transform="translate(40,-35)">
					<g id="g3" transform="translate(-35,-20)">
					<path
						style="stroke:var(--reply-text-color);stroke-width:8;stroke-opacity:1"
						d="m 120,87.5 100,2.5e-5"
						id="path3-5" />
					<path
						style="stroke:var(--reply-text-color);stroke-width:8;stroke-opacity:1"
						d="M 70,150 120,87.5"
						id="path3-5-2" />
					</g>
				</g>
			</svg>
		</div>
		<MessageReply v-if="props.replyMessage" :id="props.message.uuid"
			:author="getDisplayName(props.replyMessage.member)"
			:text="props.replyMessage?.message"
			:reply-id="props.replyMessage.uuid" max-width="reply" />
		<div class="left-column">
			<Avatar :profile="props.message.member" class="message-author-avatar"/>
		</div>
		<div class="message-data">
			<div class="message-metadata">
				<span class="message-author-username" tabindex="0" :style="`color: ${generateIrcColor(props.message.member.user.uuid)}`">
					{{ getDisplayName(props.message.member) }}
				</span>
				<span class="message-date" :title="date.toString()">
					<span v-if="getDayDifference(date, currentDate) === 1">Yesterday at</span>
					<span v-else-if="getDayDifference(date, currentDate) > 1 ">{{ date.toLocaleDateString(undefined) }},</span>

					{{ date.toLocaleTimeString(undefined, { hour12: getPreferredTimeFormat() == "12", timeStyle: "short" }) }}
				</span>
			</div>
			<div class="message-text" v-html="sanitized" :hidden="hideText" tabindex="0"></div>
			<MessageMedia v-if="mediaLinks.length" :links="mediaLinks" />
		</div>
	</div>
	<div v-else ref="messageElement" @contextmenu="showContextMenu($event, contextMenu, menuItems)"
			class="message grouped-message" :class="{ 'mentioned': props.replyMessage || props.isMentioned }"
			:data-message-id="props.message.uuid" :editing.sync="props.editing">
		<div class="left-column">
			<span :class="{ 'invisible': dateHidden }" class="message-date side-message-date" :title="date.toString()">
				{{ date.toLocaleTimeString(undefined, { hour12: getPreferredTimeFormat() == "12", timeStyle: "short" }) }}
			</span>
		</div>
		<div class="message-data">
			<div class="message-text" :class="$style['message-text']" v-html="sanitized" :hidden="hideText" tabindex="0"></div>
			<MessageMedia v-if="mediaLinks.length" :links="mediaLinks"/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import DOMPurify from 'dompurify';
import { parse } from 'marked';
import type { MessageProps } from '~/types/props';
import MessageMedia from './MessageMedia.vue';
import MessageReply from './UserInterface/MessageReply.vue';
import type { ContextMenuInterface, ContextMenuItem } from '~/types/interfaces';

const { getDisplayName } = useProfile()
const { getUser } = useAuth()

const route = useRoute();

const props = defineProps<MessageProps>();

const me = await getUser()

const contextMenu = useState<ContextMenuInterface>("contextMenu", () => ({ show: false, pointerX: 0, pointerY: 0, items: [] }));

const messageElement = ref<HTMLDivElement>();

const dateHidden = ref<boolean>(true);

const date = uuidToDate(props.message.uuid);

const currentDate: Date = new Date()

console.log("[MSG] message to render:", props.message);
console.log("author:", props.message.member);
console.log("[MSG] reply message:", props.replyMessage);

const linkRegex = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/g;
const linkMatches = props.message.message.matchAll(linkRegex).map(link => link[0]);
const mediaLinks = ref<string[]>([]);
console.log("link matches:", linkMatches);

const hideText = ref(false);

const sanitized = ref<string>();

onMounted(async () => {
	const parsed = await parse(props.message.message, { gfm: true });
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

	const links: string[] = [];
	for (const link of linkMatches) {
		console.log("link:", link);
		try {
			const res = await $fetch.raw(link);
			if (res.ok && res.headers.get("content-type")?.match(/^image\/(apng|gif|jpeg|png|webp)$/)) {
				console.log("link is image");
				links.push(link);
			}
		} catch (error) {
			console.error(error);
		}

		mediaLinks.value = [...links];
	}

	if (mediaLinks.value.length) {
		const nonLinks = props.message.message.split(linkRegex);
		let invalidContent = false;
		for (const nonLink of nonLinks) {
			if (nonLink != "" && nonLink != "\n" && nonLink != "<br>") {
				invalidContent = true;
				break;
			}
		}
		hideText.value = !invalidContent;
	};

	console.log("media links:", mediaLinks);
});

//function toggleTooltip(e: Event) {
//	showHover.value = !showHover.value;
//}

const messageMenuItems: ContextMenuItem[] = [
	{ name: "Reply", icon: "lucide:reply", type: "normal", callback: () => { if (messageElement.value) replyToMessage(messageElement.value, props) } }
]

console.log("me:", me);
if (props.message.member.user.uuid == me!.uuid) {
	// Inserts "edit" option at index 1 (below the "reply" option)
	messageMenuItems.splice(Math.min(1, messageMenuItems.length), 0, { name: "Edit (WIP)", icon: "lucide:square-pen", type: "normal", callback: () => { /* if (messageElement.value) editMessage(messageElement.value, props) */ } });
}

if (props.message.member.user.uuid == me!.uuid /* || check message delete permission*/) {
	// Inserts "edit" option at index 2 (below the "edit" option)
	messageMenuItems.splice(Math.min(2, messageMenuItems.length), 0, { name: "Delete (WIP)", icon: "lucide:trash", type: "danger", callback: () => {} });
}

const memberMenuItems = await createMemberContextMenuItems(props.author, route.params.serverId as string);

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
	display: grid;
	grid-template-columns: 4rem 1fr;
	align-items: center;

	text-align: left;
	/* -4 dvw due to 2dvw of padding on both sides */
	width: calc(100% - 4dvw);
	overflow-wrap: anywhere;

	padding-top: .2rem;
	padding-bottom: .2rem;
	padding-left: 2dvw;
	padding-right: 1dvw;
	border-radius: 0 var(--minor-radius) var(--minor-radius) 0;
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

.message-metadata {
	display: flex;
	gap: .5dvw;
	align-items: center;
}

.message-data {
	/* border: 1px solid white; */
	display: flex;
	flex-direction: column;
	height: 100%;
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
	cursor: pointer;
}

.message-author-username {
	cursor: pointer;
	min-height: 2.5em;
	max-height: 2.5em;
	min-width: 2.5em;
	max-width: 2.5em;
}

.left-column {
	min-width: 2rem;
	display: flex;
	justify-content: center;
	text-align: center;
	white-space: nowrap;
	grid-row: 2;
	grid-column: 1;
	height: 100%;
	align-items: start;
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
	margin-top: .4em;
}

/*
.message-date-tooltip {
	height: 20px;;
	width: 20px;
}
*/

.highlighted {
	background-color: var(--chat-important-background-color);
}

.highlighted:hover {
	background-color: var(--chat-important-highlighted-background-color);
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

<style>

/* class used in utils/replyToMessage.ts */
.replying-to {
	background-color: var(--chat-featured-message-color);
}

</style>
