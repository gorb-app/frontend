import type { GuildMemberResponse, UserResponse } from "~/types/interfaces";

const { fetchFriends } = useApi();

export default async (profile: UserResponse | GuildMemberResponse): Promise<Date | null> => {
	let user_uuid: string;

	if ("username" in profile) {
		user_uuid = profile.uuid
	} else {
		user_uuid = profile.user_uuid
	}

	const friends = await fetchFriends()
	const friend = friends.find(friend => friend.uuid === user_uuid);
	if (friend?.friends_since) {
		return new Date(friend.friends_since);
	}

	return null
}