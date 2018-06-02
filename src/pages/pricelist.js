import React from "react";
import {Transition} from "react-spring";
import Content from "../components/content";
import Stage, {StageImage, ScrollHelper} from "../components/stage";
import {ScrollToTop} from "../components/scroll";
import {
	Table,
	Row,
	Cell,
	Label,
	Details,
	InfoWrapper,
	Info
} from "../components/table";

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
			<Content>
				<ScrollToTop />
				<Table headers={["Service", "Price"]}>
					{props.content.service.map((item, index) => {
						return (
							<Row key={index}>
								<Cell textAlign="left">
									<Label>{item.label}</Label>
									{item.details ? (
										<Details>
											{item.details}
										</Details>
									) : null}
									{item.info ? (
										<InfoWrapper>
											{item.info.map(
												(item, i) => {
													return (
														<Info key={i}>
															{item}
														</Info>
													);
												}
											)}
										</InfoWrapper>
									) : null}
								</Cell>
								<Cell textAlign="right">
									<strong>{item.price}</strong>
								</Cell>
							</Row>
						);
					})}
				</Table>
			</Content>
		</React.Fragment>
	);
};

export default Page;
