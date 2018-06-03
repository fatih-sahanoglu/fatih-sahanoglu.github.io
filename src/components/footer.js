import {zIndex} from "../design-system";
import {NavLink} from "react-router-dom";
import styled from "styled-components";

export const Footer = styled.footer`
	position: fixed;
	z-index: ${zIndex.header};
	right: 0;
	top: 0;
	height: 3rem;
	padding: 0.25rem;
	display: flex;
	visibility: hidden;
	@media (max-width: 60rem) {
		z-index: ${zIndex.footer};
	}
`;

export const HomeLink = styled(NavLink)`
	display: block;
	height: 100%;
	text-decoration: none;
	color: currentColor;
	visibility: visible;
`;
