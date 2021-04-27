import React from "react";
import { useAppSelector } from "../../../app/hooks";
import { getJsonData } from "../imageTaggerSlice";

const JsonDisplay = () => {
	const jsonData = useAppSelector(getJsonData);
	return (
		<div>
			<textarea value={jsonData} readOnly />
			<a
				href={`data:text/json;charset=utf-8,${encodeURIComponent(jsonData)}`}
				download='taggedImage.json'>
				Go
			</a>
		</div>
	);
};

export default JsonDisplay;
