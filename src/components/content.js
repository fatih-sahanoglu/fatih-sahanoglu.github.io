import styled from "styled-components";
import {header} from '../design-system'

const Content = styled.main.attrs({
	id: "Content"
})`
	padding: ${header.height} 1em 1rem;
	max-width: 60rem;
	margin: 1rem auto 0;
	min-height: calc(100vh - 1rem);
`;

export default Content;
