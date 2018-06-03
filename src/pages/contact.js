import React from "react";
import Page from "./page";
import data from "./contact.json";
import {Block, Fat, Huge, Bigger} from "../components/text";

const Home = () => {
	return (
		<Page stage={data.stage} shade={data.shade}>
			<Block>
				<Fat>Scharschmidthstr. 32</Fat>
				<br />
				<Fat>
					80995 <Bigger>Munich</Bigger>
				</Fat>
				<br />
				<Fat>+49 176 20 977 087</Fat>
				<br />
				<Fat>
					<Huge>Call us to arrange an appointment.</Huge>
				</Fat>
				<br />
				<Fat>fatih@fatih-sahanoglu.com</Fat>
				<br />
				<Fat>Mo. - Sa. 9:00 AM - open end</Fat>
			</Block>
		</Page>
	);
};

export default Home;
