import React from "react";
import Page from "./page";
import data from "./my-soulmate-data";
import {Block, Fat, Huge, Bigger} from "../components/text";

const Home = () => {
	return (
		<Page stage={data.stage} shade={data.shade}>
			<Block>
				<Fat>
					At sweet rebells, the  <Bigger>"My Soulmate"</Bigger> are
					the <Huge>masterminds </Huge>
					behind the collections. From idea creation,{" "}
					<Bigger>pattern making</Bigger> and{" "}
					<Huge>collaborations</Huge>, they are the brains behind the{" "}
					<Bigger>clothes  you wear proudly.</Bigger> They are the <Huge>
						trendsetters
					</Huge>{" "}
					and creative muses, but sometimes they like to stray from
					the complete coastal vibe that we{" "}
					<Bigger>adore so much</Bigger> and throw in something a{" "}
					<Bigger>little more</Bigger> chic and a little bit{" "}
					<Huge>more special</Huge> ...{" "}
				</Fat>
				<br />
				<Fat>
					The label <Bigger>"My Soulmate"</Bigger>  sweet rebells
					Closet Collection is a <Huge>refreshing range</Huge>{" "}
					delivering a mix of <Bigger>modern silhouettes</Bigger>,
					little details , bubi collar,{" "}
					<Bigger>frocks fabrics.</Bigger>
				</Fat>
			</Block>
		</Page>
	);
};

export default Home;
