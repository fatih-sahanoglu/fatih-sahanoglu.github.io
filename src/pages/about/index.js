import React from "react";
import Content from "../../components/content";
import {Shade} from "../../components/stage";
import {ScrollToTop} from "../../components/scroll";
import templates from "../templates";
import {body, attributes} from "./content.md";
const Template = templates[attributes.template];

const Index = () => {
	return (
		<Content>
			<Shade />
			<ScrollToTop />
			<Template text={body} />
		</Content>
	);
};

export default Index;
