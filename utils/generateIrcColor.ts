import xxhash from "xxhash-wasm"

let h64: CallableFunction;
(async () => {
	h64 = (await xxhash()).h64;
})();

export default (seed: string, saturation: number = 100, lightness: number = 50): string => {
	const idHash = useState(`h64Hash-${seed}`, () => h64(seed))
	const hashValue: bigint = idHash.value

	return `hsl(${hashValue % 360n}, ${saturation}%, ${lightness}%)`
}