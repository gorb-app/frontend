import type { UserResponse } from "~/types/interfaces";

export default function sortUsers(users: UserResponse[]): UserResponse[] {
	return users.sort((a, b) => {
		return getDisplayName(a).localeCompare(getDisplayName(b))
	})
}