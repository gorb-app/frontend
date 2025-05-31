import type { ChannelResponse } from "~/types/interfaces";

export default defineNuxtRouteMiddleware(async (to, from) => {
	const { fetchChannels } = useApi();

	const guildId = to.params.serverId as string;

	const channels: ChannelResponse[] | undefined = await fetchChannels(guildId);
	console.log("channels:", channels);

	if (channels && channels.length > 0) {
		console.log("wah");
		return await navigateTo(`/servers/${guildId}/channels/${channels[0].uuid}`, { replace: true });
	}
})