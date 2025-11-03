const ws = await useWebSocket();

export default (): number => {
	let eventId: number;

	do {
		let nums = "";
		for (let i = 0; i < 3; i++) {
			nums += Math.ceil(Math.random() * 9);
		}
		eventId = parseInt(nums);
	} while (!ws.isEventIdFree(eventId))
	
	return eventId;
}
