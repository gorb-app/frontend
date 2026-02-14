export default class Timer {
	title: string | undefined;
	startTime: number | undefined;
	endTime: number | undefined;

	constructor(title?: string) {
		this.title = title;
	}

	start() {
		this.startTime = Date.now();
	}

	stop() {
		if (this.startTime && !this.endTime) {
			this.endTime = Date.now();
			console.log(`[TIMER] Duration${this.title ? " for \"" + this.title + "\"" : ""}: ${this.endTime - this.startTime}`);
		}
	}
}