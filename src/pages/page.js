import React from "react";
import {Transition} from "react-spring";
import Content from "../components/content";
import {Shade, Slideshow} from "../components/stage";
import {ScrollToTop} from "../components/scroll";
import {Fatdown} from "../components/markdown";

const Page = props => {
	return (
		<React.Fragment>
			{props.slideshow && <Slideshow slides={props.slideshow} />}
			<Content>
				<Shade shade={props.shade} />
				<ScrollToTop />
				{props.fatdown && <Fatdown text={props.fatdown} />}
				{props.children}
			</Content>
		</React.Fragment>
	);
};

export default Page;
