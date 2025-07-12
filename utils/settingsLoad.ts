import type { ClientSettings } from "~/types/settings"

export default (): ClientSettings => {
	let clientSettingsItem: string | null = localStorage.getItem("clientSettings")
	if (typeof clientSettingsItem != "string") {
		clientSettingsItem = "{}"
	}

	let clientSettings: ClientSettings = {}
	try {
		clientSettings = JSON.parse(clientSettingsItem)
	} catch {
		clientSettings = {}
	}

	if (typeof clientSettings !== "object") {
		clientSettings = {}
	}

	return clientSettings
}