<template>
  <div id="message-area">
	<div id="messages" ref="messagesElement">
		<Message v-for="message of messages" :username="message.user.display_name ?? message.user.username" :text="message.message"
			:timestamp="uuidToTimestamp(message.uuid)" :img="message.user.avatar" format="12" />
	</div>
	<div id="message-box" class="rounded-corners">
		<form id="message-form" @submit="sendMessage">
			<input v-model="messageInput" id="message-box-input" class="rounded-corners" type="text" name="message-input" autocomplete="off">
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

const props = defineProps<{ channelUrl: string, amount?: number, offset?: number, reverse?: boolean }>();

const messagesRes: MessageResponse[] | undefined = await fetchWithApi(
	`${props.channelUrl}/messages`,
	{ query: { "amount": props.amount ?? 100, "offset": props.offset ?? 0 } }
);
if (messagesRes && props.reverse) {
  messagesRes.reverse();
}

const messages = ref<MessageResponse[]>([]);

const route = useRoute();

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
	messages.value?.push(
		JSON.parse(event.data)
	);
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
	padding-top: 3dvh;
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
	margin-top: 1dvh;
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
}

#messages {
	overflow-y: scroll;
	display: flex;
	flex-direction: column;
	gap: 1dvh;
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