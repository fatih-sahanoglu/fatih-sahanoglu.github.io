import React from "react";
import data from "./kids.json";
import Page from "./pricelist";

export default () => (
	<Page stage={data.stage} content={data.content} shade={data.shade} />
);
