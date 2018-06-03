import React from "react";
import Content from "../../components/content";
import {ScrollToTop} from "../../components/scroll";
import {Shade} from "../../components/stage";
import {Marked} from '../../components/markdown';
import content from "./content.md";

const Page = () => {
	return (
		<Content>
			<Shade />
			<ScrollToTop />
			<Marked text={content}/>
		</Content>
	);
};

export default Page;
