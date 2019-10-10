import React from "react";
import {body, attributes} from "./page.md";

const PageReader = props => {
	const slideshow = props.slideshow.map(slide => {
		return {
			srcSet: slide.image.filter(x => x.preset !== "default" && x.preset !== "prefetch").map(x => {
				return `${x.name} ${x.width}w`
			}).join(", "),
			src: slide.image.find(x => x.preset === "default" && x.format === "jpg").name,
			style: slide.data.attributes,
			body: slide.data.body
		}
	})
	return props.children({
		...props,
		slideshow
	})
}
export default () =>
	React.createElement(PageReader, {
		...attributes,
		body,
		slideshow:
		attributes.slideshow &&
		attributes.slideshow.map(slide => {
			return {
				image: require(`./slides/${slide}/slide.jpg`),
				data: require(`./slides/${slide}/slide.md`)
			};
		})
	}, props => {
		console.log(props)
		return <div>dd</div>
	});
