import React from "react";
import {colors, header, marker, zIndex} from '../design-system'
import {NavLink} from "react-router-dom";
import styled from "styled-components";
import {Icon, Stroke} from "./svg";

export const Header = styled.header`
	position: fixed;
	display: flex;
	align-items: flex-start;
	align-content: flex-start;
	z-index: ${zIndex.header};
	top: 0;
	left: 0;
	right: 0;
	height: ${header.height};
	overflow: visible;
	background: ${colors.header.background};
	color: ${colors.header.color};

	@media print {
		display: none;
	}

	@media (max-width: 60rem) {
		height: auto;
		width: 17rem;
		right: 100%;
		bottom: 0;
		left: auto;
		overflow: auto;
		transform: translate3d(var(--x), 0, 0);
		background: ${colors.sidebar.background};
		color: ${colors.sidebar.color};
	}
`;

export const Menu = styled.nav`
	position: relative;
	z-index: 1;
	display: flex;
	height: ${header.height};
	margin-right: calc(${header.height} * 3.3);
	@media (max-width: 60rem) {
		flex-direction: column;
		width: 100%;
		height: auto;
		margin: 0;
	}
`;

export const StyledLink = styled(NavLink)`
	position: relative;
	display: inline-flex;
	align-items: center;
	align-content: center;
	justify-content: center;
	flex: 1 1 ${header.height};
	height: ${header.height};
	padding: 0.25em 0.5em;
	color: currentColor;
	text-decoration: none;
	white-space: nowrap;
	
	@media (max-width: 60rem) {
		justify-content: flex-start;
	}
	
	&::before {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: ${marker.height};
		background: none;
		opacity: 0.25;
		@media (max-width: 60rem) {
			display: none;
		}
	}
	&:focus {
		outline: 0;
		background: ${colors.header.focus};

		@media (max-width: 60rem) {
			background: ${colors.sidebar.focus};
			border-left: 1rem solid rgba(0, 0, 0, 0.4);
		}
	}
	&:hover {
		@media (max-width: 60rem) {
			background: rgba(0, 0, 0, 0.3);
		}
	}
	&.selected {
		@media (max-width: 60rem) {
			background: rgba(0, 0, 0, 0.2);
			border-left: 2rem solid rgba(0, 0, 0, 0.4);
		}
	}

	&:hover::before {
		background: currentColor;
		opacity: 0.25;
	}

	&:active::before {
		background: currentColor;
		opacity: 0.5;
	}

	&.selected::before {
		background: currentColor;
		opacity: 1;
	}
`;

export const Button = styled.button`
	position: fixed;
	z-index: ${zIndex.header};
	top: 0;
	left: 0;
	margin: 0;
	height: 1em;
	width: 1em;
	padding: 0.125em 0.5666em 0.5666em 0.125em;
	font-size: ${header.height};
	border: 0;
	display: none;
	align-items: center;
	align-content: center;
	justify-content: center;
	background: ${colors.elements.background};
	color: ${colors.elements.color};
	clip-path: polygon(0 0, 0 100%, 100% 0, 0 0);
	&:focus {
		outline: 0;
		background: ${colors.elements.focus};
	}
	@media (max-width: 60rem) {
		display: flex;
		transform: translate3d(var(--x), 0, 0);
	}
	@media print {
		display: none;
	}
`;

export const MenuButton = props => {
	return (
		<Button {...props}>
			<Icon viewBox="0 0 100 100">
				{props.morph.map((x, i) => {
					return <Stroke key={i} d={x} />;
				})}
			</Icon>
		</Button>
	);
};
export const StyledMarker = styled.span`
	position: absolute;
	bottom: 0;
	left: 0;
	height: ${marker.height};
	width: 1000px;
	background: currentColor;
	transition: transform 0.2s ease-in-out;
	transform-origin: 0 50%;
	@media (max-width: 60rem) {
		display: none;
	}
`;

export const Marker = props => {
	const style = {
		transform: `translate3d(${props.position}px, 0, 0) scale3d(${props.width * 0.001},1,1)`
	};
	return <StyledMarker style={style} />;
};
