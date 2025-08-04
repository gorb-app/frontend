import type { GuildMemberResponse, UserResponse } from "~/types/interfaces"

const { fetchFriends } = useApi();

export const useProfile = () => {
	function getAboutMe (profile: UserResponse | GuildMemberResponse): string | null {
		if ("username" in profile) {
			return profile.about
		} else {
			return profile.user.about
		}
	}

	function getDisplayName (profile: UserResponse | GuildMemberResponse): string  {
		if ("username" in profile) {
			// assume it's a UserResponse
			if (profile.display_name) return profile.display_name
			return profile.username
		} else {
			// assume it's a GuildMemberResponse
			if (profile.nickname) return profile.nickname
			if (profile.user.display_name) return profile.user.display_name
			return profile.user.username
		}
	}

	async function getFriendsSince (profile: UserResponse | GuildMemberResponse): Promise<Date | null> {
		let user_uuid: string;

		if ("username" in profile) {
			user_uuid = profile.uuid
		} else {
			user_uuid = profile.user.uuid
		}

		const friends = await fetchFriends()
		const friend = friends.find(friend => friend.uuid === user_uuid);
		if (friend?.friends_since) {
			return new Date(friend.friends_since);
		}

		return null
	}

	function getGuildJoinDate (profile: UserResponse | GuildMemberResponse): Date | null {
		if ("username" in profile) {
			return null
		} else {
			return uuidToDate(profile.uuid)
		}
	}

	function getPronouns (profile: UserResponse | GuildMemberResponse): string | null  {
		if ("username" in profile) {
			return profile.pronouns
		} else {
			return profile.user.pronouns
		}
	}

	function getRegistrationDate (profile: UserResponse | GuildMemberResponse): Date | null {
		if ("username" in profile) {
			return uuidToDate(profile.uuid)
		} else {
			return uuidToDate(profile.user.uuid)
		}
	}

	function getUsername (profile: UserResponse | GuildMemberResponse): string {
		if ("username" in profile) {
			return profile.username
		} else {
			return profile.user.username
		}
	}

	function getUuid (profile: UserResponse | GuildMemberResponse): string | null {
		if ("username" in profile) {
			return profile.uuid
		} else {
			return profile.user.uuid
		}
	}
	
	return {
		getAboutMe,
		getDisplayName,
		getFriendsSince,
		getGuildJoinDate,
		getRegistrationDate,
		getPronouns,
		getUsername,
		getUuid		
	}
}
