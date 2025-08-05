export interface ClientSettings {
	timeFormat?: TimeFormat
	selectedThemeStyle?: string // URL
	selectedThemeLayout?: string // URL
}

export interface TimeFormat {
	index: number,
	format: "auto" | "12" | "24"
}