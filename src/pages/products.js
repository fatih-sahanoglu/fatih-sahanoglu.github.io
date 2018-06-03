import React from "react";
import data from "./products-data";
import Page from "./pricelist";

export default () => (
	<Page stage={data.stage} content={data.content} shade={data.shade} />
);
