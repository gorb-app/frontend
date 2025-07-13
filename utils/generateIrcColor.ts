import xxhash from "xxhash-wasm"

const { h64 } = await xxhash()

export default (seed: string): string => {
	const lightness = 50
	
	// this should probably be cached eventually
	const idHash = h64(seed)

	return `hsl(${idHash % 360n}, 100%, ${lightness}%)`
}