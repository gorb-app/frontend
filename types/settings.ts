export interface ClientSettings {
	selectedThemeId?: string, // the ID of the theme, not the URL, for example "dark"
	timeFormat?: TimeFormat
}

export interface TimeFormat {
	index: number,
	format: "auto" | "12" | "24"
}