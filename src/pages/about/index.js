import React from "react";
import Content from "../../components/content";
import {Shade} from "../../components/stage";
import {ScrollToTop} from "../../components/scroll";
import {BlockText} from "../../components/markdown";
import content from "./content.md";

const Index = () => {
	return (
		<Content>
			<Shade />
			<ScrollToTop />
			<BlockText text={content} />
		</Content>
	);
};

export default Index;
