import React from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { getImageData, getTaggedAreasLength } from "../imageTaggerSlice";

import AreaPicker from "./AreaPicker";
import Area from "./Area";
import Toolbar from "./Toolbar";

const ImageTagger = () => {
	const imageData = useAppSelector(getImageData);
	const nbOfTags = useAppSelector(getTaggedAreasLength);
	const dispatch = useAppDispatch();
	return (
		<div className='imageTagger row'>
			<div className='col-12 col-md-6'>
				<div className='image'>
					<img className='img-fluid' src={imageData} alt='' />

					<div className='imageMap'>
						<AreaPicker />
						{Array(nbOfTags)
							.fill(null)
							.map((_, i) => (
								<Area key={i} index={i} />
							))}
					</div>
				</div>
			</div>
			<div className='toolbar col-12 col-md-6'>
				<Toolbar />
			</div>
		</div>
	);
};

export default ImageTagger;
