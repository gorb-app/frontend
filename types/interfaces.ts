export interface ChannelPermissionResponse {
	channel_uuid: string,
	role_uuid: string,
	permissions: number
}

export interface RoleResponse {
	uuid: string,
	guild_uuid: string,
	name: string,
	color: number,
	position: number,
	permissions: number
}

export interface GuildResponse {
    uuid: string,
    name: string,
    description: string | null,
    icon: string | null,
    owner_uuid: string,
    roles: RoleResponse[],
    member_count: number
}

export interface GuildMemberResponse {
	uuid: string,
	nickname: string,
	guild_uuid: string,
	is_owner: boolean,
	user: UserResponse,
	roles: RoleResponse[]
}

export interface GuildMembersResponse {
	objects: GuildMemberResponse[],
	amount: number,
	pages: number,
	page: number
}

export interface ChannelResponse {
	uuid: string,
	guild_uuid: string,
	name: string,
	description: string,
	permissions: ChannelPermissionResponse[]
}

export interface MessageResponse {
	uuid: string,
	channel_uuid: string,
	user_uuid: string,
	message: string,
	reply_to: string | null,
	member: GuildMemberResponse,
}

export interface InviteResponse {
	id: string,
	user_uuid: string,
	guild_uuid: string
}

export interface UserResponse {
	uuid: string,
	username: string,
	display_name: string | null,
	avatar: string | null,
	pronouns: string | null,
	about: string | null,
	email?: string,
	email_verified?: boolean,
	friends_since: string | null,
}

export interface StatsResponse {
	accounts: number,
    uptime: number,
    version: string,
    registration_enabled: boolean,
    email_verification_required: boolean,
    build_number: string
}

export interface ScrollPosition {
	scrollHeight: number,
	scrollWidth: number,
	scrollTop: number,
	scrollLeft: number
	offsetHeight: number,
	offsetWidth: number,
	offsetTop: number,
	offsetLeft: number
}

export interface DropdownOption {
	name: string,
	value: string | number,
	callback: () => void
}

export interface ModalProps {
	title?: string,
	obscure?: boolean,
	onClose?: () => void,
	onCancel?: () => void,
	onCloseButton?: () => void,
}

export interface ContextMenuItem {
	name: string,
	icon?: string,
	type: "normal" | "danger"
	callback: (...args: any[]) => any;
}

export interface ContextMenuInterface {
	show: boolean,
	pointerX: number,
	pointerY: number,
	items: ContextMenuItem[]
}

export interface NavbarItem {
	title: string,
	icon: string,
	hasPing?: boolean, // whether to draw a "ping" icon or not
	callback: (...args: any[]) => any;
}

export interface NavbarInterface {
	clientItems?: NavbarItem[]
	channelItems?: NavbarItem[] // search bar will require some changes
	contextName?: string
	contextIcon?: string
	guildUuid?: string
}

export interface NavbarOptions {
	guild?: GuildResponse
	channel?: ChannelResponse
	isDirectMessages?: boolean
}

