import React from "react";
import Markdown from "markdown-react-js";
import {Block, Bigger, Huge, Fat} from "./text";

const BLOCK = {
	html: Block,
	blockquote: Fat,
	strong: Huge,
	em: Bigger
};
export const BlockText = props => <Markdown {...props} tags={BLOCK} />;

export const Marked = props => <Markdown {...props} />;
