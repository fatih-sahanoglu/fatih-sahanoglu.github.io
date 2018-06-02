import React from "react";
import data from "./women.json";
import Page from "./pricelist";

export default () => <Page stage={data.stage} content={data.content} />;
