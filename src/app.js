import React from "react";
import {Route, Switch} from "react-router-dom";
import {injectGlobal} from "styled-components";
import {Spring} from "react-spring";
import routing from "./routes.json";

// Components
import {
	Header,
	Marker,
	StyledLink,
	Menu,
	MenuButton
} from "./components/header";
import {Footer} from "./components/footer";
import Logo from "./components/logo";
// Pages
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
import NotFound from "./pages/not-found";
import {colors} from "./design-system";

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

const hiddenPages = ["404", "home"];

const routes = Object.entries(routing)
	.filter(([k]) => !hiddenPages.includes(k))
	.map(([key, v]) => ({key, ...v}));

const morph = t => {
	const a = `M10,${20 - t * 10} L90,${20 + t * 70}`;
	const b = `M${10 + t * 40},50 L${90 - t * 40},50`;
	const c = `M10,${80 + t * 10} L90,${80 - t * 70}`;
	return [a, b, c];
};

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
									morph={morph(t)}
									style={{"--x": `${t * 20}rem`}}
								/>
								<Header style={{"--x": `${t * 20}rem`}}>
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
							path={`/${route.path}`}
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
