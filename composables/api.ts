import type { ChannelResponse, GuildMemberResponse, GuildResponse, MessageResponse, StatsResponse, UserResponse } from "~/types/interfaces";

function ensureIsArray(list: any) {
	if (Array.isArray(list)) {
		return list
	} else {
		return []
	}
}

export const useApi = () => {
	async function fetchGuilds(): Promise<GuildResponse[]> {
		return ensureIsArray(await fetchWithApi(`/guilds`));
	}
	
	async function fetchGuild(guildId: string): Promise<GuildResponse | undefined> {
		return await fetchWithApi(`/guilds/${guildId}`);
	}

	async function fetchMyGuilds(): Promise<GuildResponse[]> {
		return ensureIsArray(await fetchWithApi(`/me/guilds`));
	}

	async function fetchChannels(guildId: string): Promise<ChannelResponse[]> {
		return ensureIsArray(await fetchWithApi(`/guilds/${guildId}/channels`));
	}

	async function fetchChannel(channelId: string): Promise<ChannelResponse | undefined> {
		return await fetchWithApi(`/channels/${channelId}`)
	}

	async function fetchMembers(guildId: string): Promise<GuildMemberResponse[]> {
		return ensureIsArray(await fetchWithApi(`/guilds/${guildId}/members`));
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
	
	async function fetchFriends(): Promise<UserResponse[]> {
		return ensureIsArray(await fetchWithApi('/me/friends'));
	}

	async function addFriend(username: string): Promise<void> {
		return await fetchWithApi('/me/friends', { method: "POST", body: { username } });
	}

	async function removeFriend(userId: string): Promise<void> {
		return await fetchWithApi(`/me/friends/${userId}`, { method: "DELETE" });
	}

	async function fetchMessages(channelId: string, options?: { amount?: number, offset?: number }): Promise<MessageResponse[] | undefined> {
		return await fetchWithApi(`/channels/${channelId}/messages`, { query: { amount: options?.amount ?? 100, offset: options?.offset ?? 0 } });
	}

	async function fetchMessage(channelId: string, messageId: string): Promise<MessageResponse | undefined> {
		return await fetchWithApi(`/channels/${channelId}/messages/${messageId}`);
	}

	async function createGuild(name: string): Promise<GuildResponse | undefined> {
		return await fetchWithApi(`/guilds`, { method: "POST", body: { name } });
	}

	async function joinGuild(invite: string): Promise<GuildResponse> {
		return await fetchWithApi(`/invites/${invite}`, { method: "POST" }) as GuildResponse;
	}

	async function createChannel(guildId: string, name: string, description?: string): Promise<void> {
		return await fetchWithApi(`/guilds/${guildId}/channels`, { method: "POST", body: { name, description } });
	}
	
	async function fetchInstanceStats(apiBase: string): Promise<StatsResponse> {
		return await $fetch(`${apiBase}/stats`, { method: "GET" });
	}

	async function sendVerificationEmail(): Promise<void> {
		const email = useAuth().user.value?.email;
		await fetchWithApi("/auth/verify-email", { method: "POST", body: { email } });
	}

	async function sendPasswordResetEmail(identifier: string): Promise<void> {
		await fetchWithApi("/auth/reset-password", { method: "GET", query: { identifier } });
	}

	async function resetPassword(password: string, token: string) {
		await fetchWithApi("/auth/reset-password", { method: "POST", body: { password, token } });
	}

	return {
		fetchGuilds,
		fetchGuild,
		fetchMyGuilds,
		fetchChannels,
		fetchChannel,
		fetchMembers,
		fetchMember,
		fetchUsers,
		fetchUser,
		fetchFriends,
		addFriend,
		removeFriend,
		fetchMessages,
		fetchMessage,
		createGuild,
		joinGuild,
		createChannel,
		fetchInstanceStats,
		sendVerificationEmail,
		sendPasswordResetEmail,
		resetPassword
	}
}
