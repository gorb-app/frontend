export default defineAppConfig({
	title: "Gorb",
    buildTimeString: new Date().toISOString(),
    gitHash: process.env.GIT_SHORT_REV || "N/A"
})
