export const optimized = input => {
	return Array.isArray(input) ? input.find(image => image.preset === "default").name : input;
};

export const srcset = input => {
	return Array.isArray(input)
		? input
				.filter(x => x.preset !== "default")
				.map(image => `${image.name} ${~~(image.width / 2)}w`)
				.join(", ")
		: input;
};
