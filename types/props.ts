import type { GuildMemberResponse, MessageResponse, UserResponse } from "./interfaces";

export interface MessageProps {
	class?: string,
	img?: string | null,
	author: GuildMemberResponse
	text: string,
	timestamp: number,
	format: "12" | "24",
	type: "normal" | "grouped",
	marginBottom: boolean,
	authorColor: string,
	last: boolean,
	messageId: string,
	replyingTo?: boolean,
	editing?: boolean,
	me: UserResponse
	message: MessageResponse,
	replyMessage?: MessageResponse
	isMentioned?: boolean,
}