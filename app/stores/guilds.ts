import { defineStore } from 'pinia';
import Timer from '~/classes/Timer';
import type { ChannelResponse, GuildMemberResponse, GuildResponse } from '~/types/interfaces';

interface State {
	guilds: Map<string, GuildResponse>;
	members: Map<string, Map<string, GuildMemberResponse>>;
	channels: Map<string, Map<string, ChannelResponse>>;
}

export const useGuildsStore = defineStore("guilds", {
	state: (): State => ({
		guilds: new Map(),
		members: new Map(),
		channels: new Map(),
	}),
	getters: {
		guildsArray: (state): GuildResponse[] => Array.from(state.guilds.values()),
	},
	actions: {
		async getGuilds(): Promise<Map<string, GuildResponse>> {
			await this.initGuildsIfEmpty();
			return this.guilds;
		},
		async getGuildsArray(): Promise<GuildResponse[]> {
			const guilds = await this.getGuilds();
			return Array.from(guilds.values());
		},
		async getGuild(guildId: string): Promise<GuildResponse | undefined> {
			await this.initGuildsIfEmpty();
			return this.guilds.get(guildId);
		},
		async initGuildsIfEmpty(): Promise<void> {
			const timer = new Timer("INIT-GUILD");
			timer.start();
			console.log(`[STORE-GUILDS] Intializing guilds map if it's empty`);
			if (this.guilds.size) {
				console.log("[STORE-GUILDS] Guilds are present");
				timer.stop();
				return;
			};
			console.log("[STORE-GUILDS] Guilds are not present");
			console.log("[STORE-GUILDS] Fetching guilds");
			const { fetchMyGuilds } = useApi();
			const fetchedMembers = await fetchMyGuilds();
			console.log("[STORE-GUILDS] Fetched guilds");
			if (fetchedMembers.length) {
				console.log("[STORE-GUILDS] Creating map of guilds");
				const guilds = new Map(fetchedMembers.map(guild => [guild.uuid, guild]));
				console.log("[STORE-GUILDS] Saving map to state");
				this.guilds = guilds;
			}
			console.log("[STORE-GUILDS] Done");
			timer.stop();
		},
		async getMembers(guildId: string): Promise<Map<string, GuildMemberResponse>> {
			console.log("[STORE-GUILDS] getMembers() called");
			await this.initMembersIfNotExists(guildId);
			const members = this.members.get(guildId)!;
			return members;
		},
		async getMembersArray(guildId: string): Promise<GuildMemberResponse[]> {
			console.log("[STORE-GUILDS] getMembersArray() called");
			const members = await this.getMembers(guildId);
			console.log("[STORE-GUILDS] members map:", members);
			const membersArray = Array.from(members ? members.values() : []);
			console.log("[STORE-GUILDS] members array:", membersArray);
			return membersArray;
		},
		async getMember(guildId: string, memberId: string): Promise<GuildMemberResponse | undefined> {
			const timer = new Timer("getMember()");
			timer.start();
			console.log("[STORE-GUILDS] getMember() called");
			await this.initMembersIfNotExists(guildId);
			const member = this.members.get(guildId)?.get(memberId);
			timer.stop();
			return member;
		},
		async initMembersIfNotExists(guildId: string): Promise<void> {
			const timer = new Timer("INIT-MEMBERS");
			timer.start();
			console.log(`[STORE-GUILDS] Intializing members map for guild with UUID ${guildId} if it doesn't exist`);
			if (this.members.get(guildId)) {
				console.log("[STORE-GUILDS] Guild members are present");
				timer.stop();
				return;
			};
			console.log("[STORE-GUILDS] Guild members are not present");
			console.log("[STORE-GUILDS] Fetching members");
			const { fetchMembers } = useApi();
			const fetchedMembers = await fetchMembers(guildId);
			console.log("[STORE-GUILDS] Fetched members:", fetchedMembers);
			if (fetchedMembers.objects.length) {
				console.log("[STORE-GUILDS] Creating map of members");
				const members = new Map(fetchedMembers.objects.map(member => [member.uuid, member]));
				console.log("[STORE-GUILDS] Created members map:", members);
				console.log("[STORE-GUILDS] Saving map to state");
				this.members.set(guildId, members);
			}
			console.log("[STORE-GUILDS] Done");
			timer.stop();
		},
		async getChannels(guildId: string): Promise<Map<string, ChannelResponse>> {
			const timer = new Timer("getChannels()");
			timer.start();
			await this.initChannelsIfNotExists(guildId);
			const channels = this.channels.get(guildId)!;
			timer.stop();
			return channels;
		},
		async getChannelsArray(guildId: string): Promise<ChannelResponse[]> {
			const channels = await this.getChannels(guildId);
			return Array.from(channels ? channels.values() : []);
		},
		async getChannel(guildId: string, channelId: string) {
			await this.initChannelsIfNotExists(guildId);
			const channel = this.channels.get(guildId)?.get(channelId);
			return channel;
		},
		async initChannelsIfNotExists(guildId: string): Promise<void> {
			const timer = new Timer("INIT-CHANNELS");
			timer.start();
			console.log(`[STORE-GUILDS] Intializing channels map for guild with UUID ${guildId} if it doesn't exist`);
			if (this.channels.get(guildId)) {
				console.log("[STORE-GUILDS] Guild channels are present");
				timer.stop();
				return;
			};
			console.log("[STORE-GUILDS] Guild channels are not present");
			console.log("[STORE-GUILDS] Fetching channels");
			const { fetchChannels } = useApi();
			const fetchedChannels = await fetchChannels(guildId);
			console.log("[STORE-GUILDS] Fetched channels");
			if (fetchedChannels.length) {
				console.log("[STORE-GUILDS] Creating map of channels");
				const channels = new Map(fetchedChannels.map(channel => [channel.guild_uuid, channel]));
				console.log("[STORE-GUILDS] Saving map to state");
				this.channels.set(guildId, channels);
			}
			console.log("[STORE-GUILDS] Done");
			timer.stop();
		},
	},
})
