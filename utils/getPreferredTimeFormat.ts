export default (): "12" | "24" => {
	const format = settingsLoad().timeFormat?.format ?? "auto"

	if (format == "12") {
		return "12"
	} else if (format == "24") {
		return "24"
	}

	return "24"
}