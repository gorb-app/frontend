import type { ChannelResponse } from "~/types/interfaces";

export default defineNuxtRouteMiddleware(async (to, from) => {
	const { fetchChannels } = useApi();

	const guildId = to.params.serverId as string;

	const guildsStore = useGuildsStore();
	const channels: ChannelResponse[] = await guildsStore.getChannelsArray(guildId);
	console.log("channels:", channels);

	if (channels.length > 0) {
		console.log("wah");
		return await navigateTo(`/servers/${guildId}/channels/${channels[0].uuid}`, { replace: true });
	}
})