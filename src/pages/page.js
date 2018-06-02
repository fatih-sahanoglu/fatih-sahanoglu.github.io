import React from "react";
import {Transition} from "react-spring";
import Content from "../components/content";
import Stage, {StageImage, ScrollHelper} from "../components/stage";
import {ScrollToTop} from "../components/scroll";

const Page = props => {
	return (
		<React.Fragment>
			<Stage>
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
				<ScrollHelper
					to="Content"
					href={"#Content"}
					smooth={true}
					duration={window.innerHeight / 2}
				/>
			</Stage>
			<Content >
				<ScrollToTop />
				{props.children}
			</Content>
		</React.Fragment>
	);
};

export default Page;
