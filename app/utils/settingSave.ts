export default (key: string, value: any): void => {
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

	clientSettings[key] = value

	localStorage.setItem("clientSettings", JSON.stringify(clientSettings))
}