export default (wellKnownText: string): Record<string, string> => {
	const lines = wellKnownText.trim().replaceAll(" ", "").split("\n");
	const settings: Record<string, string> = {};
	for (const line of lines) {
		const separatorIndex = line.search(":");
		const key = line.slice(0, separatorIndex);
		const value = line.slice(separatorIndex + 1, line.length);
		settings[key] = value;
	}
	return settings;
}
