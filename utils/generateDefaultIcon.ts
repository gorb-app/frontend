export default (name: string, seed: string): string => {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	if (canvas && ctx) {
		canvas.width = 256;
		canvas.height = 256;

		// get the first char from every word in the guild name
		let previewName = "";
		if (name.length > 3) {
			let guildName: string[] = name.split(' ')
			for (let i = 0; i < 3; i ++) {
				if (guildName.length > i) {
					previewName += guildName[i].charAt(0)
				} else {
					break
				}
			}
		} else {
			previewName = name
		}

		// fill background using seeded colour
		ctx.fillStyle = generateIrcColor(seed, 50)
		ctx.fillRect(0, 0, 256, 256)

		ctx.fillStyle = 'white'
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'
		const preferredFont = document.documentElement.style.getPropertyValue("--preferred-font")
		ctx.font = `bold 96px ${preferredFont}, Arial, Helvetica, sans-serif`
		// 136 isn't actually centered, but it *looks* centered
		ctx.fillText(previewName, 128, 136)

		return canvas.toDataURL("image/png");
	}

	return "https://tenor.com/view/dame-da-ne-guy-kiryukazuma-kiryu-yakuza-yakuza-0-gif-14355451116903905918"
}