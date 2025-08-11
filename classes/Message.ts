import type { MessageResponse } from "~/types/interfaces";

export default class Message {
	uuid: string;
	channelUuid: string;
	userUuid: string;
	message: string;

	constructor({ uuid, channel_uuid, user_uuid, message }: MessageResponse) {
		this.uuid = uuid;
		this.channelUuid = channel_uuid;
		this.userUuid = user_uuid;
		this.message = message;
	}
}