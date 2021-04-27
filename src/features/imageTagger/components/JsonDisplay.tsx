import React from "react";
import { useAppSelector } from "../../../app/hooks";
import { getJsonTags, getImageData } from "../imageTaggerSlice";

const JsonDisplay = () => {
	const jsonTags = useAppSelector(getJsonTags);
	const imageData = useAppSelector(getImageData);

	const handleClick = (e: any) => {
		if (imageData) {
			e.target.href = `data:text/json;charset=utf-8,${encodeURIComponent(
				JSON.stringify(imageData, null, 2)
			)}`;
		}
	};

	return (
		<div>
			<textarea className='jsonDisplay' rows={15} value={jsonTags} readOnly />
			{
				<a
					onClick={handleClick}
					href='./index.html'
					download='taggedImage.json'>
					Go
				</a>
			}
		</div>
	);
};

export default JsonDisplay;
