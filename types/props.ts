import type { UserResponse } from "./interfaces";

export interface MessageProps {
	class?: string,
	img?: string | null,
	author?: UserResponse
	text: string,
	timestamp: number,
	format: "12" | "24",
	type: "normal" | "grouped",
	marginBottom: boolean,
	last: boolean,
	messageId: string,
	replyingTo?: boolean,
	editing?: boolean,
	me: UserResponse
}