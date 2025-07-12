import type { RuntimeNuxtHooks } from 'nuxt/schema';

declare module "nuxt/schema" {
	interface RuntimeNuxtHooks {
		"app:message:right-clicked": (payload: { messageId: string }) => void
	}
}
