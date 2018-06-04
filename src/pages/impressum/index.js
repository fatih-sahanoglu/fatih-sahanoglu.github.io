import React from "react";
import Content from "../../components/content";
import {Shade} from "../../components/stage";
import {ScrollToTop} from "../../components/scroll";
import {body, attributes} from "./content.md";
import {Markdown} from '../../components/markdown'

const Index = () => {
	return (
		<Content>
			<Shade />
			<ScrollToTop />
			<Markdown text={body} />
		</Content>
	);
};

export default Index;
