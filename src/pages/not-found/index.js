import React from "react";
import Stage, {StageImage} from "../../components/stage";
import {prefetch, srcset} from "../../utils/images";

const NotFound = () => {
	const image = require("./images/image_001.jpg");
	const style = {
		objectPosition: "10% 100%"
	};
	return (
		<Stage>
			<StageImage
				src={prefetch(image)}
				srcset={srcset(image)}
				alt="page not found"
				style={style}
			/>
		</Stage>
	);
};

export default NotFound;
