export default (key: string): any => {
	let clientSettingsItem: string | null = localStorage.getItem("clientSettings")
	if (typeof clientSettingsItem != "string") {
		clientSettingsItem = "{}"
	}

	let clientSettings: { [key: string]: any } = {}
	try {
		clientSettings = JSON.parse(clientSettingsItem)
	} catch {
		clientSettings = {}
	}

	if (typeof clientSettings !== "object") {
		clientSettings = {}
	}

	return clientSettings[key]
}