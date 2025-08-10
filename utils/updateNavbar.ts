import type { INavbar, NavbarOptions } from "~/types/interfaces";

const navbar = useState<INavbar>("navbar")

export default async (options: NavbarOptions) => {
	await nextTick()

	if (navbar.value) {
		if (options.guild) {
			navbar.value.channelItems = []
			navbar.value.contextName = options.guild?.name
			navbar.value.contextIcon = options.guild?.icon ?? undefined
			navbar.value.guildUuid = options.guild?.uuid
		}
		else if (options.isDirectMessages) {
			navbar.value.channelItems = []
			navbar.value.contextName = "Direct Messages"
			navbar.value.contextIcon = undefined
			navbar.value.guildUuid = undefined
		}
	}
}