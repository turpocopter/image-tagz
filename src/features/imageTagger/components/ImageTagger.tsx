import React, { useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
	getImageData,
	getTaggedAreasLength,
	setDisplayRatio,
} from "../imageTaggerSlice";

import AreaPicker from "./AreaPicker";
import Area from "./Area";
import Toolbar from "./Toolbar";

const ImageTagger = () => {
	const imageRef = useRef<any>(null);
	const imageData = useAppSelector(getImageData);
	const nbOfTags = useAppSelector(getTaggedAreasLength);
	const dispatch = useAppDispatch();
	useEffect(() => {
		const updateDisplayRatio = () => {
			if (imageRef && imageRef.current) {
				dispatch(setDisplayRatio(imageRef.current.width));
			}
		};
		updateDisplayRatio();
		window.addEventListener("resize", updateDisplayRatio);
		return () => {
			window.removeEventListener("resize", updateDisplayRatio);
		};
	}, [dispatch]);
	return (
		<div className='imageTagger row'>
			<div className='col-12 col-md-6'>
				<div className='image'>
					<img className='img-fluid' ref={imageRef} src={imageData} alt='' />

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
