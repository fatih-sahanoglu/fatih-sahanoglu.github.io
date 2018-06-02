import React from "react";
import {animateScroll as scroll} from "react-scroll";

export class ScrollToTop extends React.Component {
	componentDidMount() {
		scroll.scrollToTop({duration: window.innerHeight / 2});
	}

	render() {
		return null;
	}
}
