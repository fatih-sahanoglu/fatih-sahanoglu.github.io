import styled from "styled-components";

const Content = styled.main.attrs({
	id: "Content"
})`
	padding: 3rem 1em 1rem;
	max-width: 60rem;
	margin: 1rem auto 0;
	min-height: calc(100vh - 4rem);
	@media (max-width: 50rem) {
		padding-left: 3rem;
		min-height: calc(100vh - 1rem);

	}
`;

export default Content;
