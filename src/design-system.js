const hue = 250
const sat = 5
const light = 70
const alpha = 0.8

const choose = (n, m) => (n + m > 100 ? n - m : n + m)

export const colors = {
	focus: `hsla(${hue}, 10%, 40%, 1)`,
	background: `hsla(${hue}, ${sat}%, ${light}%, 1)`,
	color: light > 50 ? "#000" : "#fff",
	shade: `hsla(${hue}, ${sat}%, ${choose(light, 35)}%, 1)`,
	fade: `hsla(0, 0%, ${choose(light, 50)}%, ${alpha})`,
	elements: {
		focus: `hsla(${hue}, 10%, 40%, 1)`,
		background: `hsla(0, 0%, 0%, ${alpha})`,
		color: "#fff"
	},
	header: {
		focus: `hsla(${hue}, 10%, 40%, 1)`,
		background: `hsla(0, 0%, 0%, 0.5)`,
		color: "#fff"
	},
	fat: {
		color: `hsla(${hue}, ${sat / 2}%, 50%, 1)`,
	},
	logo: {
		focus: `hsla(${hue}, 10%, 40%, 1)`,
		color: `hsla(0, 0%, 100%, 1)`,
		stroke: `hsla(${hue}, ${sat}%, 10%, 1)`,
	},
	sidebar: {
		focus: `hsla(${hue}, 10%, 40%, 1)`,
		background: `hsla(0, 0%, 0%, ${alpha})`,
		color: "#fff"
	}
};

export const marker = {
	height: "0.25rem"
};

export const header = {
	height: "3rem"
};

export const arrow = {
	size: "2rem"
};

export const zIndex = {
	header: 10,
	footer: 9
};
