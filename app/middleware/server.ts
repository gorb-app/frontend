import Timer from "~/classes/Timer";
import type { ChannelResponse } from "~/types/interfaces";

export default defineNuxtRouteMiddleware(async (to, from) => {
	const timer = new Timer("MIDDLEWARE-SERVER");
	timer.start();

	const guildId = to.params.serverId as string;

	const guildsStore = useGuildsStore();
	const channels: ChannelResponse[] = await guildsStore.getChannelsArray(guildId);
	console.log("channels:", channels);

	if (channels.length > 0) {
		console.log("wah");
		timer.stop();
		return await navigateTo(`/servers/${guildId}/channels/${channels[0].uuid}`, { replace: true });
	}

	timer.stop();
})