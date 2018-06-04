import React from "react";
import Content from "../components/content";
import {Slideshow, Shade} from "../components/stage";
import {ScrollToTop} from "../components/scroll";
import {Table, Row, Cell, Label, Details, InfoWrapper, Info} from "../components/table";

const Page = props => {
	return (
		<React.Fragment>
			<Slideshow slides={props.stage.slides} />
			<Content>
				<Shade shade={props.shade} />
				<ScrollToTop />
				<Table headers={["Service", "Price"]}>
					{props.content.service.map((item, index) => {
						return (
							<Row key={index}>
								<Cell textAlign="left">
									<Label>{item.label}</Label>
									{item.details ? <Details>{item.details}</Details> : null}
									{item.info ? (
										<InfoWrapper>
											{item.info.map((item, i) => {
												return <Info key={i}>{item}</Info>;
											})}
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
