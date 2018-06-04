import React from "react";
import MDReact from "markdown-react-js";
import {Bigger, Huge, FatBlock} from "./text";

const tags = {
	fat: {
		html: FatBlock,
		strong: Huge,
		em: Bigger
	},
	fatdown: {
		html: React.Fragment,
		code: "code",
		pre: "pre"
	}
};

function handleIterate(Tag, props, children) {
	if (Tag === "code") {
		const type = props["data-language"];
		switch (type) {
			case "fat":
				return <MDReact key={props.key} text={children.join("\n")} tags={tags[type]} />;
			default:
				return <Tag {...props}>{children}</Tag>;
		}
	}
	if (Tag === "pre") {
		const {type} = children[0];
		switch (type) {
			case MDReact:
				return <React.Fragment {...props}>{children}</React.Fragment>;
			default:
				return <Tag {...props}>{children}</Tag>;
		}
	}
	return <Tag {...props}>{children}</Tag>;
}

export const Fatdown = props => (
	<MDReact {...props} onIterate={handleIterate} tags={tags.fatdown} />
);

export const Markdown = props => <MDReact {...props} />;
