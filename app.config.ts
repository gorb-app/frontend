export default defineAppConfig({
	title: "Gorb",
    buildTimeString: new Date().toISOString(),
    gitHash: process.env.COMMIT_REF || "N/A"
})
