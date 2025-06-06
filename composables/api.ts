import type { ChannelResponse, GuildMemberResponse, GuildResponse, MessageResponse } from "~/types/interfaces";

export const useApi = () => {
	async function fetchGuilds(): Promise<GuildResponse[] | undefined> {
		return await fetchWithApi(`/guilds`);
	}
	
	async function fetchGuild(guildId: string): Promise<GuildResponse | undefined> {
		return await fetchWithApi(`/guilds/${guildId}`);
	}

	async function fetchChannels(guildId: string): Promise<ChannelResponse[] | undefined> {
		return await fetchWithApi(`/guilds/${guildId}/channels`);
	}

	async function fetchChannel(channelId: string): Promise<ChannelResponse | undefined> {
		return await fetchWithApi(`/channels/${channelId}`)
	}

	async function fetchMembers(guildId: string): Promise<GuildMemberResponse[] | undefined> {
		return await fetchWithApi(`/guilds/${guildId}/members`);
	}

	async function fetchMember(guildId: string, memberId: string): Promise<GuildMemberResponse | undefined> {
		return await fetchWithApi(`/guilds/${guildId}/members/${memberId}`);
	}

	async function fetchUsers() {
		return await fetchWithApi(`/users`);
	}

	async function fetchUser(userId: string) {
		return await fetchWithApi(`/users/${userId}`);
	}

	async function fetchMessages(channelId: string, options?: { amount?: number, offset?: number }): Promise<MessageResponse[] | undefined> {
		return await fetchWithApi(`/channels/${channelId}/messages`, { query: { amount: options?.amount ?? 100, offset: options?.offset ?? 0 } });
	}

	async function fetchMessage(channelId: string, messageId: string): Promise<MessageResponse | undefined> {
		return await fetchWithApi(`/channels/${channelId}/messages/${messageId}`);
	}

	return {
		fetchGuilds,
		fetchGuild,
		fetchChannels,
		fetchChannel,
		fetchMembers,
		fetchMember,
		fetchUsers,
		fetchUser,
		fetchMessages,
		fetchMessage
	}
}
