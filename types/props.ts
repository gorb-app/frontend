import type { MessageResponse, UserResponse } from "./interfaces";

export interface MessageProps {
	message: MessageResponse,
	replyMessage?: MessageResponse,
	type: "normal" | "grouped",
	editing?: boolean,
	isMentioned?: boolean,
}