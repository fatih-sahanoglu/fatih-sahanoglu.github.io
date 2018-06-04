import React from "react";
import Page from "../page";
import data from "./data";
import {body, attributes} from "./content.md";

export default () => {
	return <Page slideshow={data.stage.slides} shade={data.shade} fatdown={body} />;
};
