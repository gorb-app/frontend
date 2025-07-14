import xxhash from "xxhash-wasm"

let h64: CallableFunction;
(async () => {
	h64 = (await xxhash()).h64;
})();

export default (seed: string): string => {
	const lightness = 50
	
	// this should probably be cached eventually
	const idHash = h64(seed)

	return `hsl(${idHash % 360n}, 100%, ${lightness}%)`
}