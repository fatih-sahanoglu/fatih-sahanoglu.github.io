import React from "react";
import {Link as GatsbyLink} from "gatsby";
import {PADDING, Row, Stage, useGrid} from "./grid";
import styled, {css} from "styled-components";
import {Spacing} from "./spacing";
import {KellerkindLogo, Logo} from "./logo";
import {minMax} from "../utils/number";
import {useTheme} from "../theme/theme";
import {injectIntl} from "gatsby-plugin-intl";

const Nav = styled.nav<{sticky?: boolean}>`
	position: sticky;
	width: 100%;
	top: 0;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-content: center;
	align-items: center;
	overflow: hidden;
	background: linear-gradient(to top, rgba(255, 255, 255, 0.8) 20%, rgba(255, 255, 255, 0.5));
	color: black;
	${({sticky}) =>
		sticky &&
		css`
			box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.01), 0 0 10px 0 rgba(0, 0, 0, 0.03);
			backdrop-filter: saturate(400%) blur(10px);
		`};
`;

const Stretch = styled.div<{justify?: string}>`
	flex: 1;
	display: flex;
	justify-content: ${({justify = "flex-start"}) => justify};
`;

const HomeLink = styled(GatsbyLink)`
	color: currentColor;
	text-decoration: none;
	padding: 0 calc(var(${PADDING}) * 1px);
	display: flex;
	align-content: center;
	justify-content: center;
	order: -1;
	width: 100%;
	${({theme}) => css`
		@media ${theme.grid.mq.m} {
			order: initial;
			width: initial;
		}
	`};
`;

const Link = styled(HomeLink).attrs({
	activeClassName: "active",
	partiallyActive: true
})`
	padding: 0.25em calc(var(${PADDING}) * 1px);
	&.active {
		box-shadow: 0 4px 0 0 currentColor;
	}
	font-size: 0.75em;
	${({theme}) => css`
		@media ${theme.grid.mq.m} {
			font-size: 1em;
		}
	`};
`;

const useScrollY = () => {
	const [scrollY, setScrollY] = React.useState(0);
	const handleScroll = React.useCallback(() => {
		setScrollY(window.scrollY);
	}, [setScrollY]);
	React.useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [setScrollY]);
	return scrollY;
};

const Header = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 10;
`;

interface WithClassName {
	className?: string;
}

interface WithIntl {
	intl?: any;
}

export const MobileNavigation: React.FC<WithClassName & WithIntl> = ({className, intl}) => {
	return (
		<Stage className={className}>
			<Header>
				<Nav
					role="navigation"
					style={{
						height: 65
					}}>
					<Stretch justify="flex-end">
						<Link to={`/${intl.locale}/services`}>{intl.messages.services}</Link>
						<Link to={`/${intl.locale}/location`}>{intl.messages.location}</Link>
					</Stretch>
					<HomeLink
						to="/"
						style={{
							fontSize: "2em"
						}}>
						<Logo />
					</HomeLink>
					<Stretch>
						<Link to={`/${intl.locale}/products`}>{intl.messages.products}</Link>
						<Link to={`/${intl.locale}/gallery`}>{intl.messages.gallery}</Link>
					</Stretch>
				</Nav>
			</Header>
		</Stage>
	);
};

export const MainNavigation: React.FC<WithClassName & WithIntl> = ({className, intl}) => {
	const {
		components: {header, logo}
	} = useTheme();
	const scrollY = useScrollY();
	const minSizeDiff = header.height - header.minHeight;
	const offset = header.height - minMax(0, minSizeDiff, scrollY);
	const sizeDiff = header.height - offset;
	const scale = offset / header.height;
	const sticky = offset === header.minHeight;
	const rotation = (sizeDiff / minSizeDiff) * 180 + 180;
	return (
		<Stage className={className}>
			<Header>
				<Nav
					role="navigation"
					style={{
						height: offset
					}}
					sticky={sticky}>
					<Stretch justify="flex-end">
						<Link to={`/${intl.locale}/services`}>{intl.messages.services}</Link>
						<Link to={`/${intl.locale}/location`}>{intl.messages.location}</Link>
					</Stretch>
					<HomeLink
						to="/"
						style={{
							fontSize: logo.size,
							transform: `scale3d(${scale}, ${scale}, 1) rotate3d(0,0,1,${rotation}deg)`
						}}>
						<Logo />
					</HomeLink>
					<Stretch>
						<Link to={`/${intl.locale}/products`}>{intl.messages.products}</Link>
						<Link to={`/${intl.locale}/gallery`}>{intl.messages.gallery}</Link>
						<Link to={`/${intl.locale}/blog`}>{intl.messages.blog}</Link>
					</Stretch>
				</Nav>
			</Header>
		</Stage>
	);
};

export const StyledMobileNavigation = styled(MobileNavigation)`
	margin-bottom: 65px;
	${({theme}) => css`
		@media ${theme.grid.mq.m} {
			display: none;
		}
	`};
`;
export const StyledMainNavigation = styled(MainNavigation)`
	${({theme}) => css`
		margin-bottom: ${theme.components.header.height}px;
		display: none;
		@media ${theme.grid.mq.m} {
			display: block;
		}
	`};
`;

const Navigation: React.FC<WithIntl> = ({intl}) => {
	return (
		<Row>
			<StyledMainNavigation intl={intl} />
			<StyledMobileNavigation intl={intl} />
		</Row>
	);
};

export default injectIntl(Navigation);
