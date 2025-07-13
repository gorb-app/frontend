<template>
	<div id="message-area">
		<div id="messages" ref="messagesElement">
			<Message v-for="(message, i) of messages" :username="message.user.display_name ?? message.user.username"
				:text="message.message" :timestamp="messageTimestamps[message.uuid]" :img="message.user.avatar"
				:format="timeFormat" :type="messagesType[message.uuid]"
				:margin-bottom="(messages[i + 1] && messagesType[messages[i + 1].uuid] == 'normal') ?? false"
				:last="i == messages.length - 1" :message-id="message.uuid" :author="message.user" :me="me"
				:message="message" :is-reply="message.reply_to"
				:author-color="`${generateIrcColor(message.user.uuid)}`"
				:reply-message="message.reply_to ? getReplyMessage(message.reply_to) : undefined" />
		</div>
		<div id="message-box" class="rounded-corners">
			<form id="message-form" @submit="sendMessage">
				<div id="message-box-left-elements">
					<span class="message-box-button">
						<Icon name="lucide:file-plus-2" />
					</span>
				</div>

				<div id="message-textarea">
					<div id="message-textbox-input"
							role="textbox" ref="messageTextboxInput"
							autocorrect="off" spellcheck="true" contenteditable="true"
							@keydown="handleTextboxKeyDown" @input="handleTextboxInput">
					</div>
				</div>
				
				<div id="message-box-right-elements">
					<button class="message-box-button" type="submit">
						<Icon name="lucide:send" />
					</button>
					<span class="message-box-button">
						<Icon name="lucide:image-play" />
					</span>
				</div>
			</form>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { MessageResponse, ScrollPosition, UserResponse } from '~/types/interfaces';
import scrollToBottom from '~/utils/scrollToBottom';

const props = defineProps<{ channelUrl: string, amount?: number, offset?: number }>();

const me = await fetchWithApi("/me") as UserResponse;

const messageTimestamps = ref<Record<string, number>>({});
const messagesType = ref<Record<string, "normal" | "grouped">>({});
const messageGroupingMaxDifference = useRuntimeConfig().public.messageGroupingMaxDifference
const timeFormat = getPreferredTimeFormat()

const messagesRes: MessageResponse[] | undefined = await fetchWithApi(
	`${props.channelUrl}/messages`,
	{ query: { "amount": props.amount ?? 100, "offset": props.offset ?? 0 } }
);

const firstMessageByUsers = ref<Record<string, MessageResponse | undefined>>({});
const previousMessage = ref<MessageResponse>();

function groupMessage(message: MessageResponse, options?: { prevMessage?: MessageResponse, reverse?: boolean }) {
	messageTimestamps.value[message.uuid] = uuidToTimestamp(message.uuid);
	console.log("message:", message.message);
	console.log("author:", message.user.username, `(${message.user.uuid})`);

	if (!previousMessage.value || previousMessage.value && message.user.uuid != previousMessage.value.user.uuid) {
		console.log("no previous message or author is different than last messsage's");
		messagesType.value[message.uuid] = "normal";
		previousMessage.value = message;
		console.log("set previous message to:", previousMessage.value.message);
		console.log(`setting first post by user ${message.user.username} to "${message.message}" with timestamp ${messageTimestamps.value[message.uuid]}`);
		firstMessageByUsers.value[message.user.uuid] = message;
		return;
	}


	const firstByUser = firstMessageByUsers.value[message.user.uuid];
	if (firstByUser) {
		console.log("first by user exists:", firstByUser);
		if (message.user.uuid != firstByUser.user.uuid) {
			console.log("message is by new user, setting their first message")
			firstMessageByUsers.value[message.user.uuid] = message;
			console.log("RETURNING FALSE");
			messagesType.value[message.uuid] = "normal";
			return;
		}
	} else {
		console.log("first by user doesn't exist");
		console.log(`setting first post by user ${message.user.username} to "${message.message}" with timestamp ${messageTimestamps.value[message.uuid]}`);
		firstMessageByUsers.value[message.user.uuid] = message;
		console.log("RETURNING FALSE");
		messagesType.value[message.uuid] = "normal";
		return;
	}
	
	const prevTimestamp = messageTimestamps.value[firstByUser.uuid];
	const timestamp = messageTimestamps.value[message.uuid];
	
	console.log("first message timestamp:", prevTimestamp);
	console.log("timestamp:", timestamp);
	const diff = Math.abs(timestamp - prevTimestamp);
	console.log("min diff:", messageGroupingMaxDifference);
	console.log("diff:", diff);
	const lessThanMax = diff <= messageGroupingMaxDifference;
	console.log("group?", lessThanMax);
	if (!lessThanMax) {
		console.log("diff exceeds max");
		console.log(`setting first post by user ${message.user.username} to "${message.message}" with timestamp ${messageTimestamps.value[message.uuid]}`)
		firstMessageByUsers.value[message.user.uuid] = message;
		messagesType.value[message.uuid] = "normal";
		return;
	}
	console.log("RETURNING " + lessThanMax.toString().toUpperCase());
	messagesType.value[message.uuid] = "grouped";
}

if (messagesRes) {
	messagesRes.reverse();
	console.log("messages res:", messagesRes.map(msg => msg.message));
	for (const message of messagesRes) {
		console.log("[MSG] processing message:", message);
		groupMessage(message);
	}
}

function pushMessage(message: MessageResponse) {
	groupMessage(message);
	messages.value.push(message);
}

function handleTextboxKeyDown(event: KeyboardEvent) {
	if (event.key === "Enter" && event.shiftKey && messageTextboxInput.value) {
		// this enters a newline, due to not preventing default
	} else if (event.key === "Enter") {
		event.preventDefault()
		sendMessage(event)
	}
	
	adjustTextboxHeight()
}

function handleTextboxInput() {
	if (messageTextboxInput.value) {
        messageInput.value = messageTextboxInput.value.innerText;
    }

	adjustTextboxHeight()
}

// this technically uses pixel units, but it's still set using dynamic units
function adjustTextboxHeight() {
	if (messageTextboxInput.value && messageTextboxDisplay.value) {
		messageTextboxInput.value.style.height = "auto"
		messageTextboxInput.value.style.height = `${messageTextboxInput.value.scrollHeight}px`
	}
}

const messages = ref<MessageResponse[]>([]);
const messageInput = ref<string>("");
const messagesElement = ref<HTMLDivElement>();
const messageTextboxInput = ref<HTMLDivElement>();
const messageTextboxDisplay = ref<HTMLDivElement>();

if (messagesRes) messages.value = messagesRes;

const accessToken = useCookie("access_token").value;
const apiBase = useCookie("api_base").value;
const { refresh } = useAuth();
const { fetchMessages } = useApi();

let ws: WebSocket;

if (accessToken && apiBase) {
	console.log("channel url:", `${apiBase.replace("http", "ws")}/${props.channelUrl}/socket`);
	console.log("access token:", accessToken);
	do {
		console.log("Trying to connect to channel WebSocket...");
		ws = new WebSocket(`${apiBase.replace("http", "ws").replace("3000", "8080")}/${props.channelUrl}/socket`,
			["Authorization", accessToken]
		);
		if (ws) break;
		await sleep(5000);
	} while (!ws);

	ws.addEventListener("open", (event) => {
		console.log("WebSocket connected!");
	});

	ws.addEventListener("message", async (event) => {
		console.log("event data:", event.data);
		console.log("message uuid:", event.data.uuid);
		const parsedData = JSON.parse(event.data);
		console.log("[MSG] parsed message:", parsedData);
		
		console.log("parsed message type:", messagesType.value[parsedData.uuid]);
		console.log("parsed message timestamp:", messageTimestamps.value[parsedData.uuid]);
		pushMessage(parsedData);
		await nextTick();
		if (messagesElement.value) {
			console.log("scrolling to bottom");
			scrollToBottom(messagesElement.value);
		}
	});

} else {
	await refresh();
}

function sendMessage(e: Event) {
	e.preventDefault();
	if (messageInput.value && messageInput.value.trim() !== "") {
		const message: Record<string, string> = {
			message: messageInput.value.trim().replace(/\n/g, "<br>") // trim, and replace \n with <br>
		}

		const messageReply = document.getElementById("message-reply") as HTMLDivElement;
		console.log("[MSG] message reply:", messageReply);
		if (messageReply && messageReply.dataset.messageId) {
			console.log("[MSG] message is a reply");
			message.reply_to = messageReply.dataset.messageId;
		}

		console.log("[MSG] sent message:", message);
		ws.send(JSON.stringify(message));

		// reset input field
		messageInput.value = ""
		if (messageTextboxInput.value) {
			messageTextboxInput.value.innerText = ""
		}

		adjustTextboxHeight()
	}
}

function getReplyMessage(id: string) {
	console.log("[REPLYMSG] id:", id);
	const messagesValues = Object.values(messages.value);
	console.log("[REPLYMSG] messages values:", messagesValues);
	for (const message of messagesValues) {
		console.log("[REPLYMSG] message:", message);
		console.log("[REPLYMSG] IDs match?", message.uuid == id);
		if (message.uuid == id) return message;
	}
}

const route = useRoute();

onMounted(async () => {
	if (import.meta.server) return;
	console.log("[MSG] messages keys:", Object.values(messages.value));
	if (messagesElement.value) {
		scrollToBottom(messagesElement.value);
		let fetched = false;
		const amount = messages.value.length;
		let offset = messages.value.length;
		messagesElement.value.addEventListener("scroll", async (e) => {
			if (e.target) {
				const target = e.target as HTMLDivElement;
				if (target.scrollTop <= target.scrollHeight * 0.1) {
					if (fetched) return;
					fetched = true;
					console.log("scroll height is at 10% or less");
					//console.log("current oldest:", currentOldestMessage);
					const olderMessages = await fetchMessages(route.params.channelId as string, { amount, offset });
					if (olderMessages) {
						olderMessages.reverse();
						console.log("older messages:", olderMessages);
						if (olderMessages.length == 0) return;
						olderMessages.reverse();
						for (const [i, oldMessage] of olderMessages.entries()) {
							console.log("old message:", oldMessage);
							messages.value.unshift(oldMessage);
							for (const message of messages.value) {
								groupMessage(message);
							}
						}
						offset += offset;
					}
				} else {
					fetched = false;
				}
			}
		});
	}
});

let scrollPosition = ref<Record<string, ScrollPosition>>({});

onActivated(async () => {
	await nextTick();
	console.log("scroll activated");
	if (messagesElement.value) {
		if (scrollPosition.value[route.params.channelId as string]) {
			console.log("saved scroll position:", scrollPosition.value);
			setScrollPosition(messagesElement.value, scrollPosition.value[route.params.channelId as string]);
			console.log("scrolled to saved scroll position");
		} else {
			scrollToBottom(messagesElement.value);
			console.log("scrolled to bottom");
		}
	}
});

const router = useRouter();

router.beforeEach((to, from, next) => {
	console.log("scroll hi");
  	if (messagesElement.value && from.params.channelId) {
    	scrollPosition.value[from.params.channelId as string] = getScrollPosition(messagesElement.value)
		console.log("set saved scroll position to:", scrollPosition.value);
  	}
  	next()
})

</script>

<style scoped>
#message-area {
	display: flex;
	flex-direction: column;
	padding-left: 1dvw;
	padding-right: 1dvw;
	overflow: hidden;
	flex-grow: 1;
}

#message-box {
	margin-top: auto; /* force it to the bottom of the screen */
	margin-bottom: 2dvh;
	margin-left: 1dvw;
	margin-right: 1dvw;

	padding-left: 2%;
	padding-right: 2%;
	
	align-items: center;
	
	color: var(--text-color);
	border: 1px solid var(--padding-color);
	background-color: var(--chatbox-background-color);
}

#message-form {
	display: flex;
	flex-direction: row;
	gap: .55em;
}

#message-textarea {
	flex-grow: 1;
	min-height: 2.35em;
}

#message-textbox-input {
	width: 100%;
	max-height: 50dvh;

	padding: 0.5em 0;
	user-select: text;

	font-family: inherit;
	font-size: inherit;
	line-height: normal;
	border: none;
	background-color: #40404000; /* completely transparent colour */

	text-align: left;
	word-break: break-word;
	overflow-wrap: break-word;
	
	overflow-y: auto;
}

#message-box-left-elements, #message-box-right-elements {
	display: flex;
	align-items: end;
}

#messages {
	overflow-y: scroll;
	display: flex;
	flex-direction: column;
	padding-left: 1dvw;
	padding-right: 1dvw;
}

.message-box-button {
	background-color: inherit;
	border: none;
	color: var(--primary-color);
	transition: color 100ms;
	font-size: 1.5em;
}

.message-box-button:hover {
	color: var(--primary-highlighted-color);
	cursor: pointer;
}
</style>