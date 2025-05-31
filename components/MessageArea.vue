<template>
	<div id="message-area">
		<div id="messages" ref="messagesElement">
			<Message v-for="(message, i) of messages" :username="message.user.display_name ?? message.user.username"
				:text="message.message" :timestamp="messageTimestamps[message.uuid]" :img="message.user.avatar"
				format="12" :type="messagesType[message.uuid]"
				:margin-bottom="messages[i + 1] && messagesType[messages[i + 1].uuid] == 'normal'"
				:last="i == messages.length - 1" />
		</div>
		<div id="message-box" class="rounded-corners">
			<form id="message-form" @submit="sendMessage">
				<input v-model="messageInput" id="message-box-input" class="rounded-corners" type="text"
					name="message-input" autocomplete="off">
				<button id="submit-button" type="submit">
					<Icon name="lucide:send" />
				</button>
			</form>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { MessageResponse } from '~/types/interfaces';
import scrollToBottom from '~/utils/scrollToBottom';

const props = defineProps<{ channelUrl: string, amount?: number, offset?: number }>();

const messageTimestamps = ref<Record<string, number>>({});
const messagesType = ref<Record<string, "normal" | "grouped">>({});
const messageGroupingMaxDifference = useRuntimeConfig().public.messageGroupingMaxDifference

const messagesRes: MessageResponse[] | undefined = await fetchWithApi(
	`${props.channelUrl}/messages`,
	{ query: { "amount": props.amount ?? 100, "offset": props.offset ?? 0 } }
);

function groupMessage(message: MessageResponse) {
	messageTimestamps.value[message.uuid] = uuidToTimestamp(message.uuid);

		console.log("message:", message.message);
		const firstByUser = firstMessageByUsers.value[message.user.uuid];
		if (firstByUser) {
			console.log("first by user exists");
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
		const diff = (timestamp - prevTimestamp);
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

const firstMessageByUsers = ref<Record<string, MessageResponse | undefined>>({});
if (messagesRes) {
	messagesRes.reverse();
	console.log("messages res:", messagesRes.map(msg => msg.message));
	for (const message of messagesRes) {
		groupMessage(message);
	}
}

const messages = ref<MessageResponse[]>([]);

const messageInput = ref<string>();

const messagesElement = ref<HTMLDivElement>();

if (messagesRes) messages.value = messagesRes;

const accessToken = useCookie("access_token").value;
const apiBase = useCookie("api_base").value;
const { refresh } = useAuth();

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
		
		groupMessage(parsedData);
		console.log("parsed message type:", messagesType.value[parsedData.uuid]);
		console.log("parsed message timestamp:", messageTimestamps.value[parsedData.uuid]);
		messages.value.push(parsedData);
		await nextTick();
		if (messagesElement.value) {
			console.log("scrolling to bottom");
			scrollToBottom(messagesElement);
		}
	});

} else {
	await refresh();
}

function sendMessage(e: Event) {
	e.preventDefault();
	const text = messageInput.value;
	console.log("text:", text);
	if (text) {
		ws.send(text);
		messageInput.value = "";
		console.log("MESSAGE SENT!!!");
	}
}

onMounted(async () => {
	if (messagesElement.value) {
		scrollToBottom(messagesElement);
	}
});

</script>

<style scoped>
#message-area {
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 8fr 1fr;
	justify-content: space-between;
	padding-left: 1dvw;
	padding-right: 1dvw;
	overflow: hidden;
}

#message-box {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-content: center;
	border: 1px solid rgb(70, 70, 70);
	padding-bottom: 1dvh;
	padding-top: 1dvh;
	margin-bottom: 1dvh;
	margin-left: 1dvw;
	margin-right: 1dvw;
}

#message-form {
	display: flex;
	justify-content: center;
}

#message-box-input {
	width: 80%;
	background-color: rgb(50, 50, 50);
	border: none;
	color: inherit;
	padding-left: 1dvw;
	padding-right: 1dvw;
}

#messages {
	overflow-y: scroll;
	display: flex;
	flex-direction: column;
	gap: 1dvh;
	padding-left: 1dvw;
	padding-right: 1dvw;
}

#submit-button {
	background-color: inherit;
	border: none;
	color: rgb(200, 200, 200);
	font-size: 1.5em;
}

#submit-button:hover {
	color: rgb(255, 255, 255);
}
</style>