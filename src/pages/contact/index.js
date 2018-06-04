import React from "react";
import Page from "../page";
import {body as fatdown, attributes} from "./content.md";
export default () =>
	React.createElement(Page, {
		fatdown,
		shade: attributes.shade,
		slideshow:
			attributes.slideshow &&
			attributes.slideshow.map(slide => {
				return {
					...slide,
					image: require(`./images/${slide.image}`)
				};
			})
	});
