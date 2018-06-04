import React from "react";
import styled from "styled-components";

export const Fat = styled.span`
	font-family: "Bowlby One SC", sans-serif;
	@media print {
		font-family: serif;
	}
`;

export const Huge = styled.span`
	font-size: 1.7em;
	@media print {
		font-size: 1em;
	}
`;

export const Bigger = styled.span`
	font-size: 1.4em;
	@media print {
		font-size: 1em;
	}
`;

export const Block = styled.article`
	margin: 2rem 0;
	line-height: 0.75;
	text-align: justify;
	font-size: 3rem;
	hyphens: auto;
	@media (max-width: 50rem) {
		font-size: 1.5rem;
	}
	@media print {
		line-height: 1.3;
		font-size: 1em;
	}
`;

export const FatBlock = props => (
	<Block {...props}>
		<Fat>{props.children}</Fat>
	</Block>
);
