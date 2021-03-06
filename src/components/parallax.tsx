import styled from "styled-components";
import React from "react";
import {minMax} from "../utils/number";
import {useGrid} from "./grid";
import {easeIn, easeOut} from "@popmotion/easing";

export interface ParallaxProps {
	interpolate(progress: number): React.CSSProperties;
	boundary?: number;
}

const ParallaxWrapper = styled.div`
	position: relative;
	z-index: 1;
`;

const ParallaxInner = styled.div`
	position: relative;
`;

export const Parallax: React.FC<ParallaxProps> = ({children, interpolate, boundary = 0}) => {
	const {viewport} = useGrid();
	const ref = React.useRef<HTMLDivElement>();
	const [progress, setProgress] = React.useState(0);
	const handleScroll = React.useCallback(() => {
		requestAnimationFrame(() => {
			const {top} = ref.current.getBoundingClientRect();
			const {innerHeight} = window;
			const progress = minMax(0, 1, 1 - (top - boundary) / (innerHeight - boundary * 2));
			setProgress(progress);
		});
	}, [ref]);
	React.useEffect(() => {
		handleScroll();
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [handleScroll]);
	const style = React.useMemo(() => (viewport.lu ? interpolate(progress) : {}), [
		interpolate,
		progress,
		viewport
	]);

	return (
		<ParallaxWrapper ref={ref}>
			<ParallaxInner style={style}>{children}</ParallaxInner>
		</ParallaxWrapper>
	);
};
export const ParallaxBox: React.FC<{index: number}> = ({children, index}) => {
	const interpolate = React.useCallback(
		(progress: number): React.CSSProperties => ({
			transform: `translate3d(${0}%,${
				((index % 2 ? easeIn : easeOut)(1 - progress) * 100) / ((index % 3) + 2)
			}%, 0)`
		}),
		[index]
	);
	return (
		<Parallax interpolate={interpolate} boundary={200}>
			{children}
		</Parallax>
	);
};
