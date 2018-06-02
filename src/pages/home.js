import React from "react";
import {Transition} from "react-spring";
import Page from "./page";
import data from "./home.json";

const Home = () => {
	return (
		<Page stage={data.stage}>
			Home
		</Page>
	)
};

export default Home;
