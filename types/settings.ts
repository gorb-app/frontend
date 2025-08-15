export interface ClientSettings {
	timeFormat?: TimeFormat
	selectedThemeStyle?: string // URL
	selectedThemeLayout?: string // URL
}

export type TimeFormat = "Auto" | "4:18 PM" | "16:18"