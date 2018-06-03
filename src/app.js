import React from "react";
import {Route, NavLink, Switch} from "react-router-dom";
import styled, {injectGlobal} from "styled-components";
import {Spring} from "react-spring";
import routing from "./routes.json";

import {Stroke, Icon} from "./components/svg";
import Content from "./components/content";
import Men from "./pages/men";
import Women from "./pages/women";
import Kids from "./pages/kids";
import Beauty from "./pages/beauty";
import Products from "./pages/products";
import Impressum from "./pages/impressum";
import Seminars from "./pages/seminars";
import About from "./pages/about";
import Home from "./pages/home";
import Contact from "./pages/contact";
import Photographic from "./pages/photographic";
import Soulmate from "./pages/my-soulmate";
import {colors, marker} from "./design-system";

const hiddenPages = ["404", "home"];
const routes = Object.entries(routing)
	.filter(([k]) => !hiddenPages.includes(k))
	.map(([key, v]) => ({key, ...v}));

injectGlobal`
	:root {
		--header-height: 3rem;
	}
	body {
		margin: 0;
		font-family: 'BenchNine', sans-serif;
		background: ${colors.background};
		color: ${colors.color};
		@media print {
			background: #fff;
			color: #000;
			font-family: serif;
		}
	}
	#app {
		min-height: 100vh;
		background: ${colors.background};
		color: ${colors.color};
		@media print {
			background: #fff;
			color: #000;
			font-family: serif;
		}
	}
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}
`;

const NotFound = () => {
	return <Content>404</Content>;
};

const zIndex = {
	header: 10,
	footer: 9
};

const Header = styled.header`
	position: fixed;
	display: flex;
	align-items: flex-start;
	align-content: flex-start;
	z-index: ${zIndex.header};
	top: 0;
	left: 0;
	right: 0;
	height: 3rem;
	overflow: visible;
	background: ${colors.header.background};
	color: ${colors.header.color};

	@media print {
		display: none;
	}

	@media (max-width: 60rem) {
		height: auto;
		width: 20rem;
		right: auto;
		bottom: 0;
		left: -20rem;
		overflow: auto;
		transform: translate3d(var(--x), 0, 0);
		background: ${colors.sidebar.background};
		color: ${colors.sidebar.color};
	}
`;

const Menu = styled.nav`
	position: relative;
	z-index: 1;
	display: flex;
	height: max-content;
	@media (max-width: 60rem) {
		flex-direction: column;
		width: 100%;
	}
`;

const StyledLink = styled(NavLink)`
	position: relative;
	display: inline-flex;
	flex: 1 1 3em;
	padding: 0.5em 1em;
	line-height: 2em;
	color: currentColor;
	text-decoration: none;
	white-space: nowrap;
	@media (max-width: 60rem) {
		border-left: 0.5rem solid;
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
			background: rgba(0, 0, 0, 0.5);
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
			border-left: 1rem solid;
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

const Button = styled.button`
	position: fixed;
	z-index: ${zIndex.header};
	top: 0;
	left: 0;
	margin: 0;
	height: 1.5em;
	width: 1.5em;
	padding: 0.25em 0.75em 0.75em 0.25em;
	font-size: 2rem;
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

const MenuButton = props => {
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
const StyledMarker = styled.span`
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

const Marker = props => {
	const style = {
		transform: `translate3d(${
			props.position
		}px, 0, 0) scale3d(${props.width * 0.001},1,1)`
	};
	return <StyledMarker style={style} />;
};

const Footer = styled.footer`
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

const Img = styled.img`
	height: 100%;
	width: auto;
`;

const HomeLink = styled(NavLink)`
	display: block;
	height: 100%;
	text-decoration: none;
	color: currentColor;
	visibility: visible;
`;

const Logo = () => {
	return (
		<HomeLink to="/">
			<Img src={require("./assets/logo.png")} alt="logo" />
		</HomeLink>
	);
};

const content = {
	men: Men,
	women: Women,
	kids: Kids,
	about: About,
	beauty: Beauty,
	products: Products,
	impressum: Impressum,
	seminars: Seminars,
	photographic: Photographic,
	contact: Contact,
	home: Home,
	soulmate: Soulmate,
	"404": NotFound
};

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			menuOpen: false,
			markerPosition: 0,
			markerWidth: 0
		};
		this.toggleMenu = this.toggleMenu.bind(this);
		this.handleLink = this.handleLink.bind(this);
		this.handleResize = this.handleResize.bind(this);
	}

	componentDidMount() {
		window.addEventListener("resize", this.handleResize, {
			passive: true
		});
	}

	toggleMenu(e) {
		e.preventDefault();
		this.setState(prevState => ({
			menuOpen: !prevState.menuOpen
		}));
	}

	handleResize() {
		if (!this.state.selected) {
			return;
		}
		const {offsetLeft, offsetWidth} = this.state.selected;
		this.setState({
			markerPosition: offsetLeft,
			markerWidth: offsetWidth
		});
	}
	handleLink(e) {
		const {offsetLeft, offsetWidth} = e.target;
		this.setState({
			menuOpen: false,
			selected: e.target,
			markerPosition: offsetLeft,
			markerWidth: offsetWidth
		});
	}

	morph(t) {
		const d1 = [
			"M10,20 L90,20"
			//"M10,50 L90,50",
			//"M10,80 L90,80"
		];
		const d2 = [
			"M10,10 L90,90"
			//"M50,50 L50,50",
			//"M10,90 L90,10"
		];
		const a = `M10,${20 - t * 10} L90,${20 + t * 70}`;
		const b = `M${10 + t * 40},50 L${90 - t * 40},50`;
		const c = `M10,${80 + t * 10} L90,${80 - t * 70}`;
		return [a, b, c];
	}

	render() {
		return (
			<React.Fragment>
				<Spring
					from={{t: this.state.menuOpen ? 0 : 1}}
					to={{t: this.state.menuOpen ? 1 : 0}}>
					{({t}) => {
						return (
							<React.Fragment>
								<MenuButton
									onClick={this.toggleMenu}
									isOpen={this.state.menuOpen}
									morph={this.morph(t)}
									style={{"--x": `${t * 20}rem`}}
								/>
								<Header style={{"--x": `${t * 20}rem`}}>
									<Menu>
										{routes.map((route, i) => (
											<StyledLink
												key={route.key}
												to={`/${route.path}.html`}
												onClick={this.handleLink}
												activeClassName="selected">
												{route.label}
											</StyledLink>
										))}
										<Marker
											position={this.state.markerPosition}
											width={this.state.markerWidth}
										/>
									</Menu>
								</Header>
							</React.Fragment>
						);
					}}
				</Spring>
				<Switch>
					{routes.map((route, i) => (
						<Route
							key={route.key}
							path={`/${route.path}.html`}
							component={content[route.key] || NotFound}
						/>
					))}
					<Route path="/" component={Home} exact={true} />
					<Route path="/*" component={NotFound} />
				</Switch>
				<Footer>
					<Logo />
				</Footer>
			</React.Fragment>
		);
	}
}

export default App;
