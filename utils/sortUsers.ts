import type { UserResponse } from "~/types/interfaces";

export default (users: UserResponse[]): UserResponse[] => {
	return users.sort((a, b) => {
		return getDisplayName(a).localeCompare(getDisplayName(b))
	})
}