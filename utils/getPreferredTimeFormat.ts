export default (): "12" | "24" => {
	const format = settingLoad("timeFormat").timeFormat ?? "auto"

	if (format == "12-hour") {
		return "12"
	} else if (format == "24-hour") {
		return "24"
	}

	return "24"
}