import React from "react";
import {HomeLink} from "./footer";
import styled from "styled-components";

export const Img = styled.img`
	height: 100%;
	width: auto;
	@media print {
		display: none;
	}
`;

const Logo = () => {
	return (
		<HomeLink to="/">
			<Img src={require("../assets/logo.png")} alt="logo" />
		</HomeLink>
	);
};

export default Logo;
