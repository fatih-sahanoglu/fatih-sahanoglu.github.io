import React from "react";
import styled, {keyframes} from "styled-components";
import {Spring} from "react-spring";
import {Link} from "react-scroll";
import {Stroke} from "./svg";
import {arrow, colors, header} from '../design-system'
import {prefetch, srcset} from "../utils/images";

const Stage = styled.div`
	height: calc(100vh - ${header.height});
	width: 100vw;
	position: relative;
	overflow: hidden;
	@media print {
		display: none;
	}
`;

export const Wrapper = styled.div`
	position: relative;
`;

export const Arrows = styled.nav`
	visibility: hidden;
`;

export const NavArrow = styled.button`
	visibility: visible;
	position: absolute;
	display: flex;
	align-items: center;
	align-content: center;
	justify-content: center;
	z-index: 2;
	top: 50%;
	height: 2em;
	width: 1em;
	margin: -1em 0 0;
	padding: 0.125em;
	text-decoration: none;
	font-size: ${arrow.size};
	border: 0;
	background: ${colors.elements.background};
	color: ${colors.elements.color};

	&:focus {
		outline: 0;
		background: ${colors.elements.focus};
	}
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
	height: 50%;
	width: 50%;
`;

const StyledRightArrow = styled(RightArrow)`
	height: 50%;
	width: 50%;
`;

export const Left = NavArrow.extend`
	left: 0;
	padding-right: 0.375em;
	clip-path: polygon(0 0, 100% 50%, 0 100%, 0 0);
`;

export const Right = NavArrow.extend`
	right: 0;
	clip-path: polygon(100% 0, 0 50%, 100% 100%, 100% 0);
	padding-left: 0.375em;
`;

const Figure = styled.figure`
	margin: 0;
	padding: 0;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
`;

export class Slideshow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeSlide: 0,
			prevSlide: 0
		};
		this.toPrev = this.toPrev.bind(this);
		this.toNext = this.toNext.bind(this);
	}
	get slides() {
		const {activeSlide, prevSlide} = this.state;
		return this.props.slides.map((slide, i) => {
			return (
				<Spring key={i} from={{t: i - prevSlide}} to={{t: i - activeSlide}}>
					{({t}) => {
						const transform = `translate3d(${t * 100}%, 0, 0)`;
						return (
							<Figure style={{transform}}>
								<StageImage
									src={prefetch(slide.image)}
									srcSet={srcset(slide.image)}
									alt={slide.text}
									style={slide.style}
								/>
							</Figure>
						);
					}}
				</Spring>
			);
		});
	}

	toPrev(e) {
		e.preventDefault();
		this.setState(prevState => ({
			prevSlide: prevState,
			activeSlide: (prevState.activeSlide - 1 + this.slides.length) % this.slides.length
		}));
	}

	toNext(e) {
		e.preventDefault();
		this.setState(prevState => ({
			prevSlide: prevState,
			activeSlide: (prevState.activeSlide + 1) % this.slides.length
		}));
	}

	render() {
		const scrollhelper = this.props.noContent ? null : (
			<ScrollHelper
				to="Content"
				href={"#Content"}
				smooth={true}
				duration={window.innerHeight / 2}
			/>
		);
		return (
			<Wrapper>
				<Stage>{this.slides}</Stage>
				<Arrows>
					<Left onClick={this.toPrev}>
						<StyledLeftArrow />
					</Left>
					<Right onClick={this.toNext}>
						<StyledRightArrow />
					</Right>
				</Arrows>
				{scrollhelper}
			</Wrapper>
		);
	}
}

const Arrow = props => {
	return (
		<svg {...props} viewBox="0 0 100 50">
			<Stroke d="M10,5 L50,45 L90,5" />
		</svg>
	);
};

const jump = keyframes`
    from {
        transform: translate3d(0, -50%, 0);
    }
    to {
        transform: translate3d(0, 50%, 0);
    }
`;

const StyledArrow = styled(Arrow)`
	height: 50%;
	width: 50%;
	animation: ${jump} 0.5s ease-in-out infinite alternate;
`;

export const Shade = styled.div`
	position: sticky;
	z-index: 2;
	top: 0;
	margin: calc(-1 * ${header.height} - 1rem) calc((50vw - 29rem) * -1) 0;
	right: 0;
	height: ${header.height};
	background: ${props => props.shade || colors.shade};
	@media (max-width: 60rem) {
		margin: calc(-1 * ${header.height} - 1rem) -1rem 0;
	}
`;

const ScrollArrow = styled(Link)`
	visibility: visible;
	position: absolute;
	display: flex;
	align-items: center;
	align-content: center;
	justify-content: center;
	z-index: 2;
	bottom: 0;
	left: 50%;
	height: 1em;
	width: 2em;
	margin: 0 0 0 -1em;
	padding: 0.375em 0.125em 0.125em;
	font-size: ${arrow.size};
	background: ${colors.elements.background};
	color: ${colors.elements.color};
	text-decoration: none;
	clip-path: polygon(0 100%, 50% 0, 100% 100%, 0 100%);
	&:focus {
		outline: 0;
		background: ${colors.elements.focus};
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
	object-position: 50% 50%;
`;

export default Stage;
