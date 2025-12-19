/**
 * Returns a random integer between min (inclusive) and max (exclusive)
 *
 * @param min
 * @param max
 * @returns
 */
export const getRandomInt = (min: number, max: number): number => {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);

	return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
};
