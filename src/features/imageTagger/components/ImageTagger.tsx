import React from "react";
import { useAppSelector } from "../../../app/hooks";
import { getImageData, getTaggedAreasLength } from "../imageTaggerSlice";

import AreaPicker from "./AreaPicker";
import Area from "./Area";

const ImageTagger = () => {
	const imageData = useAppSelector(getImageData);
	const nbOfTags = useAppSelector(getTaggedAreasLength);
	return (
		<div className='imageTagger'>
			<img src={imageData} alt='' />
			<div className='imageMap'>
				<AreaPicker />
				{Array(nbOfTags)
					.fill(null)
					.map((_, i) => (
						<Area index={i} />
					))}
			</div>
		</div>
	);
};

export default ImageTagger;
