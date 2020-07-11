export const minMax = (min: number, max: number, n: number): number =>
	Math.max(min, Math.min(max, n));
export const price = (n: number): string => `${n.toFixed(2)} €`;
