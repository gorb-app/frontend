const apiBase = useCookie("api_base").value;
const accessToken = useCookie("access_token").value;

export const useWebSocket = async () => {
	const ws = useState<WebSocket>("ws");
  	
	if (!ws.value) {
		while (true) {
			ws.value = await connect();
			if (ws.value) {
				ws.value.addEventListener("open", () => {
					console.log("WebSocket connected!");
				});
				break;
			};
			await sleep(5000);
		}

		while (true) {
			if (ws.value.readyState == ws.value.OPEN) break;
			await sleep(5);
		}
	}

	async function connect(): Promise<WebSocket> {
		if (!apiBase || !accessToken) {
			throw new Error("No API base or access token cookie");
		}
		console.log("Trying to connect to channel WebSocket...");
		ws.value = new WebSocket(`${apiBase.replace("http", "ws").replace("3000", "8080")}/socket`,
			["Authorization", accessToken]
		);

		return ws.value;
	}
	return {
		ws
	}
}
