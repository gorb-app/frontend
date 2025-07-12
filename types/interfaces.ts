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
    roles: [],
    member_count: number
}

export interface GuildMemberResponse {
	uuid: string,
	nickname: string,
	user_uuid: string,
	guild_uuid: string,
	user: UserResponse
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
	user: UserResponse
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
	email?: string,
	email_verified?: boolean
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
	heavy?: boolean,
	onClose?: () => void,
	onCancel?: () => void
}
