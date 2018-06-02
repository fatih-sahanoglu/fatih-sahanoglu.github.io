import React from "react";
import styled, {keyframes} from "styled-components";
import {Link} from "react-scroll";
import {Stroke} from "./svg";

const Stage = styled.aside`
	height: 100vh;
	width: 100vw;
	position: relative;
`;

const Arrow = props => {
	return (
		<svg {...props} viewBox="0 0 100 50">
			<Stroke d="M10,5 L50,45 L90,5" />
		</svg>
	);
};
const StyledArrow = styled(Arrow)`
	height: 100%;
	width: 100%;
`;

const jump = keyframes`
    from {
        transform: translate3d(0,-10%,0);
    }
    to {
        transform: translate3d(0,10%,0);
    }
`;

const ScrollArrow = styled(Link)`
	position: absolute;
	display: flex;
	z-index: 2;
	bottom: 2rem;
	left: 50%;
	height: 0.5em;
	width: 1em;
	margin: 0 -0.5em 1rem;
	color: #fff;
	text-decoration: none;
	animation: ${jump} 1s ease-in-out infinite alternate;
	font-size: 10rem;
	mix-blend-mode: difference;

	@media (max-width: 50rem) {
		font-size: 5rem;
	}
`;

export const ScrollHelper = props => {
	return (
		<ScrollArrow {...props}>
			<StyledArrow />
		</ScrollArrow>
	);
};

export const StageImage = styled.img`
	height: 100%;
	width: 100%;
	object-fit: cover;
	object-position: 20% 20%;
`;

export default Stage;
