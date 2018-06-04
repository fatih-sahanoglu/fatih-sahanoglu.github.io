const hue = 10
const sat = 5
const light = 10
const alpha = 0.75
export const colors = {
	focus: `hsla(${hue + 180}, 30%, 30%, 1)`,
	background: `hsla(${hue}, ${sat}%, ${light}%, 1)`,
	color: "#fff",
	shade: `hsla(${hue}, ${sat}%, ${light * 2}%, 1)`,
	fade: `hsla(${hue}, ${sat}%, 350%, ${alpha / 2})`,
	elements: {
		focus: `hsla(${hue + 180}, 30%, 30%, 1)`,
		background: `hsla(0, 0%, 10%, ${alpha})`,
		color: "#fff"
	},
	header: {
		focus: `hsla(${hue + 180}, 30%, 30%, 1)`,
		background: `hsla(${hue}, ${sat}%, ${light}%, ${alpha / 2})`,
		color: "#fff"
	},
	fat: {
		color: `hsla(${hue}, ${sat / 2}%, ${light * 4}%, 1)`,
	},
	sidebar: {
		background: `hsla(0, 0%, 10%, ${alpha})`,
		color: "#fff"
	}
};

export const marker = {
	height: "0.25rem"
};

export const zIndex = {
	header: 10,
	footer: 9
};
