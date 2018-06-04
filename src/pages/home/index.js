import React from "react";
import Page from "../page";
import {BlockText} from "../../components/markdown";
import data from "./data";
import content from "./content.md";

const Index = () => {
	return (
		<Page stage={data.stage} shade={data.shade}>
			<BlockText text={content} />
		</Page>
	);
};

export default Index;
