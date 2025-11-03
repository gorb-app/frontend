import { WSEvent } from "~/types/enums";
import type { WSChatMessageDelete, WSMessage } from "~/types/interfaces";

export default async (id: string, channel_id: string) => {
	const { ws } = await useWebSocket();

	const entity: WSChatMessageDelete = {
		uuid: id,
		channel_uuid: channel_id
	}

	const wsMessage: WSMessage = {
		event: WSEvent.MessageDelete,
		entity
	};

	console.log("deleting message:", wsMessage);

	ws.value.send(JSON.stringify(wsMessage));
}
