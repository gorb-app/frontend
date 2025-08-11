export default (): "12" | "24" => {
	const format = settingsLoad().timeFormat ?? "Auto"

	if (format == "4:18 PM") {
		return "12"
	} else if (format == "16:18") {
		return "24"
	}

	return "24"
}