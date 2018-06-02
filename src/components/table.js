import React from "react";
import styled from "styled-components";
const shade = "rgba(0, 0, 0, 0.4)";

export const StyledTable = styled.article`
	width: 100%;
	max-width: 50rem;
	display: flex;
	flex-direction: column;
	margin: 1em auto;
	border-collapse: collapse;
	border: 0;
`;

export const Tbody = styled.section`
	display: flex;
	flex-direction: column;
`;

export const Thead = styled.header`
	display: flex;
	flex-direction: column;
	@media (max-width: 50rem) {
		display: none;
	}
`;

export const Tfoot = styled.footer`
	display: flex;
	flex-direction: column;
`;

export const Cell = styled.li`
	border: 0;
	text-align: ${({textAlign}) => textAlign || "center"};
	width: 50%;
	list-style: none;
	margin: 0;
	padding: 0.5em 1em;
	line-height: 2em;
	vertical-align: top;
	@media (max-width: 50rem) {
		width: 100%;
	}
`;

export const Heading = Cell.extend`
	font-weight: bold;
`;

export const Row = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	border-bottom: 1px solid rgba(0, 0, 0, 0);
	border-image: linear-gradient(
			to right,
			rgba(255, 255, 255, 0) 10%,
			${shade},
			rgba(255, 255, 255, 0) 90%
		)
		1;
	@media (max-width: 50rem) {
		flex-direction: column;
	}
`;

export const Label = styled.strong`
	font-weight: bold;
	display: block;
`;

export const Details = styled.small`
	font-size: 0.75em;
`;
export const InfoWrapper = styled.ul`
	list-style: none;
	margin: 1em;
	padding: 0;
`;

export const Info = styled.li`
	list-style: none;
	margin: 0;
	padding: 0 0 0 1em;
	position: relative;
	&::before {
		position: absolute;
		top: 0.25em;
		left: -1em;
		content: "";
		height: 0.5em;
		width: 0.5em;
		margin: 0.5em;
		background: none;
		border: 1px solid ${shade};
		border-radius: 50%;
		display: inline-block;
		vertical-align: middle;
	}
`;

export const Table = props => {
	return (
		<StyledTable {...props}>
			<Thead>
				<Row>
					{props.headers.map((header, i) => (
						<Heading key={i}>{header}</Heading>
					))}
				</Row>
			</Thead>
			<Tbody>{props.children}</Tbody>
		</StyledTable>
	);
};
