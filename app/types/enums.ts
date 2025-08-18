export const enum Permission {
	SendMessage = 1,
	ManageChannel = 2,
	ManageRole = 4,
	CreateInvite = 8,
	ManageInvite = 16,
	ManageGuild = 32,
	ManageMember = 64,
	BanMember = 128,
	KickMember = 256
}

export const enum WSEvent {
	MessageSend = "MessageSend",
	MessageDelete = "MessageDelete",
	MessageEdit = "MessageEdit",
	Error = "Error"
}
