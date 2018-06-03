import React from "react";
import {Transition} from "react-spring";
import Content from "../components/content";
import Stage, {
	StageImage,
	ScrollHelper,
	Shade,
	Slideshow
} from "../components/stage";
import {ScrollToTop} from "../components/scroll";

const Page = props => {
	return (
		<React.Fragment>
			<Slideshow>
				{props.stage.slides.map((slide, i) => {
					return (
						<StageImage
							key={i}
							src={slide.image}
							alt={slide.text}
							style={slide.style}
						/>
					);
				})}
			</Slideshow>
			<Content>
				<Shade shade={props.shade} />
				<ScrollToTop />
				{props.children}
			</Content>
		</React.Fragment>
	);
};

export default Page;
