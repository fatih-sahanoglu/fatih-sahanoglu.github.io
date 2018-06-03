import React from "react";
import Page from "./page";
import data from "./contact.json";

const Home = () => {
	return (
		<Page stage={data.stage} shade={data.shade}>
			<p>Scharschmidthstr. 32</p>
			<p>80995 Munich</p>
			<p>+49 176 20 977 087</p>
			<p><strong>Appointments should be arranged over the telephone</strong></p>
			<p>fatih@fatih-sahanoglu.com</p>
			<p>Mo. - Sa. 9:00 AM - open end</p>
		</Page>
	);
};

export default Home;
