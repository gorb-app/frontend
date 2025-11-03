const apiBase = useCookie("api_base").value;
const accessToken = useCookie("access_token").value;

export const useWebSocket = async () => {
	const socket = useState<WebSocket>("socket");
	const eventIds = useState<number[]>("eventIds", () => []);
  	
	if (!socket.value) {
		while (true) {
			socket.value = await connect();
			if (socket.value) {
				socket.value.addEventListener("open", () => {
					console.log("WebSocket connected!");
				});
				break;
			};
			await sleep(5000);
		}

		while (true) {
			if (socket.value.readyState == socket.value.OPEN) break;
			await sleep(5);
		}
	}

	async function connect(): Promise<WebSocket> {
		if (!apiBase || !accessToken) {
			throw new Error("No API base or access token cookie");
		}
		console.log("Trying to connect to channel WebSocket...");
		socket.value = new WebSocket(`${apiBase.replace("http", "ws").replace("3000", "8080")}/socket`,
			["Authorization", accessToken]
		);

		return socket.value;
	}

	function pushEventId(id: number) {
		eventIds.value.push(id);
	}
	
	function removeEventId(id: number) {
		const index = eventIds.value.findIndex(eventId => eventId == id);
		if (index != -1) {
			eventIds.value.splice(index, 1);
		}
	}

	function isEventIdFree(id: number): boolean {
		return eventIds.value.findIndex(eventId => eventId == id) == -1;
	} 

	return {
		socket,
		pushEventId,
		removeEventId,
		isEventIdFree
	}
}
