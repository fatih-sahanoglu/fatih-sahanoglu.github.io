import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom";
import styled, {injectGlobal} from "styled-components";
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
import Home from "./pages/home";

const hiddenPages = [
	"404",
	"home"
]
const routes = Object.entries(routing).filter(([k]) => !hiddenPages.includes(k)).map(([key, v]) => ({key, ...v}));

const colors = {
	focus: "#abe",
	background: "#fff",
	color: "#111"
}

injectGlobal`
	:root {
		--header-height: 3rem;
	}
	body {
		margin: 0;
		font-family: 'Source Sans Pro', sans-serif;
	}
	#app {
		min-height: 100vh;
		background: ${colors.background};
		color: ${colors.color};
	}
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}
`;

const About = () => {
	return <Content>About</Content>;
};

const NotFound = () => {
	return <Content>404</Content>;
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
	home: Home,
	"404": NotFound
};

const zIndex = {
	header: 10
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
	color: #fff;

	@media (max-width: 60rem) {
		height: auto;
		width: 20rem;
		right: auto;
		bottom: 0;
		left: -20rem;
		overflow: auto;
		transform: translate3d(${props => (props.isOpen ? "100%" : 0)}, 0, 0);
		background: #fff;
		color: #000;
		transition: transform 0.3s ease-in-out;
	}
`;

const Background = styled.div`
	position: absolute;
	z-index: 0;
	top: 0;
	left: 0;
	right: 0;
	bottom: -3rem;
	background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
	pointer-events: none;
	@media (max-width: 60rem) {
		display: none;
	}

`

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

	&:focus {
		outline: 0;
	}

	&:hover::before {
		content: "";
		position: absolute;
		bottom: 0.5rem;
		left: 0;
		right: 0;
		height: 2px;
		background: currentColor;
		opacity: 0.25;
	}
	
	&:focus::before {
		content: "";
		position: absolute;
		bottom: 0.5rem;
		left: 0;
		right: 0;
		height: 2px;
		background: ${colors.focus};
		opacity: 0.75;
	}
	
	&.selected::before {
		content: "";
		position: absolute;
		bottom: 0.5rem;
		left: 0;
		right: 0;
		height: 2px;
		background: currentColor;
	}
`;

const Button = styled.button`
	position: fixed;
	z-index: ${zIndex.header};
	top: 0;
	left: 0;
	margin: 0.25rem;
	height: 2.5rem;
	width: 2.5rem;
	padding: 0.5rem;
	border: 0;
	display: none;
	color: #fff;
	background: none;
	mix-blend-mode: difference;
	transform: translate3d(${props => (props.isOpen ? "20rem" : 0)}, 0, 0);
	transition: transform 0.3s ease-in-out;

	@media (max-width: 60rem) {
		display: flex;
	}
`;

const MenuButton = props => {
	return (
		<Button {...props}>
			<Icon viewBox="0 0 100 100">
				<Stroke d="M10,20 L90,20" />
				<Stroke d="M10,50 L90,50" />
				<Stroke d="M10,80 L90,80" />
			</Icon>
		</Button>
	);
};
const StyledMarker = styled.span`
	position: absolute;
	bottom: 0.5rem;
	left: 0;
	height: 2px;
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
		transform: `translate3d(${props.position}px, 0, 0) scale3d(${props.width * 0.001},1,1)`
	}
	return <StyledMarker style={style}/>
}

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
	}

	toggleMenu(e) {
		e.preventDefault();
		this.setState(prevState => ({
			menuOpen: !prevState.menuOpen
		}));
	}

	handleLink(e) {
		const {offsetLeft, offsetWidth} = e.target
		this.setState({
			menuOpen: false,
			markerPosition: offsetLeft,
			markerWidth: offsetWidth
		});
	}

	render() {
		return (
			<Router>
				<React.Fragment>
					<MenuButton
						onClick={this.toggleMenu}
						isOpen={this.state.menuOpen}
					/>
					<Header isOpen={this.state.menuOpen}>
						<Background/>
						<Menu>
							{routes.map((route, i) => (
								<StyledLink
									key={route.key}
									to={`/${route.path}`}
									onClick={this.handleLink}
									activeClassName="selected">
									{route.label}
								</StyledLink>
							))}
							<Marker position={this.state.markerPosition} width={this.state.markerWidth}/>
						</Menu>
					</Header>
					{routes.map((route, i) => (
						<Route
							key={route.key}
							path={`/${route.path}`}
							component={content[route.key] || NotFound}
							exact={route.key === "home"}
						/>
					))}
				</React.Fragment>
			</Router>
		);
	}
}
const app = document.getElementById("app");
ReactDOM.render(<App />, app);
