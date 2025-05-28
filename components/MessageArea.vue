<template>
  <div id="message-area">
	<div id="messages" ref="messagesElement">
		<Message v-for="message of messages" :username="displayNames[message.user_uuid]" :text="message.message"
			:timestamp="uuidToTimestamp(message.uuid)" format="12" />
	</div>
	<div id="message-box">
		<form id="message-form" @submit="sendMessage">
			<input v-model="messageInput" type="text" name="message-input" id="message-box-input">
			<button type="submit">
				<Icon name="lucide:send" />
			</button>
		</form>
	</div>
</div>
</template>

<script lang="ts" setup>
import type { MessageResponse } from '~/types/interfaces';
import fetchUser from '~/utils/fetchUser';

const props = defineProps<{ channelUrl: string, amount?: number, offset?: number, reverse?: boolean }>();

const messagesRes: MessageResponse[] | undefined = await fetchWithApi(
	`${props.channelUrl}/messages`,
	{ query: { "amount": props.amount ?? 100, "offset": props.offset ?? 0 } }
);
if (messagesRes && props.reverse) {
  messagesRes.reverse();
}

const messages = ref<MessageResponse[]>([]);

const displayNames = ref<Record<string, string>>({});

const route = useRoute();

const messageInput = ref<string>();

const messagesElement = ref<HTMLDivElement>();

if (messagesRes) messages.value = messagesRes;
	const displayNamesArr: Record<string, string> = {};
	for (const message of messages.value) {
		if (!displayNamesArr[message.user_uuid]) {
			const displayName = await getDisplayName(message.user_uuid);
			displayNamesArr[message.user_uuid] = displayName;
		}
	}
	displayNames.value = displayNamesArr;

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
	await sleep(10000);
} while (!ws);

ws.addEventListener("open", (event) => {
	console.log("WebSocket connected!");
});

ws.addEventListener("message", (event) => {
	console.log("event data:", event.data);
	messages.value?.push(
		JSON.parse(event.data)
	);
});
} else {
	await refresh();
}

async function getDisplayName(memberId: string): Promise<string> {
	//const user = await fetchMember((route.params.serverId as string), memberId);
	const user = await fetchUser((route.params.serverId as string), memberId);
	return user!.display_name ?? user!.username;

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
	messagesElement.value?.scrollTo({ top: messagesElement.value.scrollHeight });
});

</script>

<style scoped>

#message-area {
	padding-top: 3dvh;
}

#message-area {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-left: 1dvw;
	padding-right: 1dvw;
	overflow: hidden;
}

#message-box {
	border: 1px solid rgb(70, 70, 70);
	padding-bottom: 1dvh;
	padding-top: 1dvh;
	margin-bottom: 1dvh;
}

#message-input {
	width: 100%;
}

#messages {
	overflow-y: scroll;
	display: flex;
	flex-direction: column;
	gap: 1dvh;
}

</style>