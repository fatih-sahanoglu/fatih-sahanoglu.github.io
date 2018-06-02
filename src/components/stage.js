import React from "react";
import styled, {keyframes} from "styled-components";
import {Link} from "react-scroll";
import {Stroke} from "./svg";

const Stage = styled.div`
	height: calc(100vh - 3rem);
	width: 100vw;
	position: relative;
	
	&::after {
		pointer-events: none;
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 6rem;
		z-index: 2;
		background-image: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0));
	
	}
`;

export const Wrapper = styled.div`
	position: relative;
`;

export const Arrows = styled.div`
	visibility: hidden;
`;

export const NavArrow = styled.a.attrs({
	href: "#"
})`
	visibility: visible;
	position: absolute;
	z-index: 2;
	top: 50%;
	height: 3em;
	margin: 0.5rem;
	width: 1.5em;
	margin-top: -1.5em;
	font-size: 2rem;
	color: currentColor;
`;

const LeftArrow = props => {
	return (
		<svg {...props} viewBox="0 0 50 100">
			<Stroke d="M45,10 L5,50 45,90" />
		</svg>
	);
};

const RightArrow = props => {
	return (
		<svg {...props} viewBox="0 0 50 100">
			<Stroke d="M5,10 L45,50 5,90" />
		</svg>
	);
};

const StyledLeftArrow = styled(LeftArrow)`
	height: 100%;
	width: 100%;
`;

const StyledRightArrow = styled(RightArrow)`
	height: 100%;
	width: 100%;
`;

export const Left = NavArrow.extend`
	left: 0;
`;

export const Right = NavArrow.extend`
	right: 0;
`;

export class Slideshow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeSlide: 0
		}
		this.toPrev = this.toPrev.bind(this)
		this.toNext = this.toNext.bind(this)
	}
	get slides() {
		const {activeSlide} = this.state;
		return React.Children.toArray(this.props.children).map((slide, i) => {
			const transform = `translate3d(${i < activeSlide ? -100 : i > activeSlide ? 100 : 0}%, 0, 0)`
			const style = {
				transform
			}
			return React.cloneElement(slide, {
				style
			})
		});
	}

	toPrev(e) {
		e.preventDefault();
		this.setState(prevState => ({
			activeSlide: (prevState.activeSlide - 1 + this.slides.length) % this.slides.length
		}))
	}

	toNext(e) {
		e.preventDefault();
		this.setState(prevState => ({
			activeSlide: (prevState.activeSlide + 1) % this.slides.length
		}))
	}

	render() {
		return (
			<Wrapper>
				<Stage>{this.slides}</Stage>
				<Arrows>
					<Left onClick={this.toPrev}>
						<StyledLeftArrow/>
					</Left>
					<Right onClick={this.toNext}>
						<StyledRightArrow/>
					</Right>
				</Arrows>
				<ScrollHelper
					to="Content"
					href={"#Content"}
					smooth={true}
					duration={window.innerHeight / 2}
				/>
			</Wrapper>
		)
	}
}

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
        transform: translate3d(0, -0.5rem, 0);
    }
    to {
        transform: translate3d(0, 0.5rem, 0);
    }
`;


export const Shade = styled.div`
	position: sticky;
	z-index: 2;
	top: 0;
	margin: -4rem calc((50vw - 29rem) * -1) 0;
	right: 0;
	height: 3rem;
	background: inherit;
	@media (max-width: 60rem) {
		display: none;
	}
`

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
	mix-blend-mode: screen;

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
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	height: 100%;
	width: 100%;
	object-fit: cover;
	object-position: 20% 20%;
	transition: transform 0.3s ease-in-out;
`;

export default Stage;
