import React from "react";
import Stage, {StageImage} from "../../components/stage";

const NotFound = () => {
	const style = {
		objectPosition: "10% 100%"
	};
	return (
		<Stage>
			<StageImage src={require("./images/image_001.jpg")} alt="page not found" style={style} />
		</Stage>
	);
};

export default NotFound;
