export const optimized = input => {
	return Array.isArray(input) ? input.find(image => image.preset === "default").name : input;
};

export const prefetch = input => {
	return Array.isArray(input) ? input.find(image => image.preset === "prefetch").name : input;
};

export const srcset = input => {
	const excludes = ["default", "prefetch"]
	return Array.isArray(input)
		? input
				.filter(x => !excludes.includes(x.preset))
				.map(image => `${image.name} ${~~(image.width / 2)}w`)
				.join(", ")
		: input;
};
