import { defineStore } from 'pinia';
import Timer from '~/classes/Timer';
import type { UserResponse } from '~/types/interfaces';

interface State {
	me: UserResponse | undefined,
	friends: Map<string, UserResponse> | undefined;
}

export const useUserStore = defineStore("user", {
	state: (): State => ({
		me: undefined,
		friends: undefined,
	}),
	actions: {
		async getMe(): Promise<UserResponse | undefined> {
			const timer = new Timer("getMe()");
			timer.start();
			const { fetchMe } = useApi();
			if (!this.me) {
				this.me = await fetchMe();
			}
			timer.stop();
			return this.me;
		},
		async getFriends(): Promise<Map<string, UserResponse>> {
			const timer = new Timer("getFriends()");
			timer.start();
			if (!this.friends) {
				const { fetchFriends } = useApi();
				const friends = await fetchFriends();
				this.friends = new Map(friends.map(friend => [friend.uuid, friend]));
			}
			timer.stop();
			return this.friends;
		},
		async getFriendsArray(): Promise<UserResponse[]> {
			const friends = await this.getFriends();
			return Array.from(friends.values());
		},
		async getFriend(userId: string): Promise<UserResponse | undefined> {
			const timer = new Timer("getFriend()");
			timer.start();
			const friend = this.friends?.get(userId);
			timer.stop();
			return friend;
		},
	},
})
