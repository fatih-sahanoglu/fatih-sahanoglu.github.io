import React from "react";
import Page from "./page";
import data from "./home.json";
import {Block, Fat, Huge, Bigger} from "../components/text";

const Home = () => {
	return (
		<Page stage={data.stage} shade={data.shade}>
			<Block>
				<Fat>Standard... </Fat>
				<Fat>I can't live with that. </Fat>
				<Fat>
					I live my own individual lifestyle.{" "}
					<Bigger>
						and rather listen to my friends and customers,{" "}
					</Bigger>
				</Fat>
				<Fat>
					than wear expensive clothing and play big or talk as if I
					was.
				</Fat>
				<Fat>
					I try to find the perfect match with a well planned, direct,{" "}
					<Huge>unforced chat and empathy. </Huge>
				</Fat>
				<Fat>Lean back and enjoy. </Fat>
				<Fat>
					Together we have enough time to find what fits you best.{" "}
					<Bigger>
						Dive into the underground and forget everything around
						you.{" "}
					</Bigger>
				</Fat>
			</Block>
		</Page>
	);
};

export default Home;
