import React from "react";
import Page from "./page";
import data from "./contact.json";
import {Block, Fat, Huge, Bigger} from "../components/text";

const Home = () => {
	return (
		<Page stage={data.stage} shade={data.shade}>
			<Fat>Scharschmidthstr. 32</Fat>
			<br />
			<Fat>80995 Munich</Fat>
			<br />
			<Fat>+49 176 20 977 087</Fat>
			<br />
			<Fat>
				<Bigger>
					Appointments should be arranged over the telephone
				</Bigger>
			</Fat>
			<br />
			<Fat>fatih@fatih-sahanoglu.com</Fat>
			<br />
			<Fat>Mo. - Sa. 9:00 AM - open end</Fat>
		</Page>
	);
};

export default Home;
