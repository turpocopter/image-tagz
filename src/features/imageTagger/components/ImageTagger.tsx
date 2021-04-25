import React from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectImageData } from "../imageTaggerSlice";

import AreaPicker from "./AreaPicker";

import "./ImageTagger.css";

const ImageTagger = () => {
	const imageData = useAppSelector(selectImageData);
	return (
		<div className='imageTagger'>
			<img src={imageData} alt='' />
			<div className='imageMap'>
				<AreaPicker />
			</div>
		</div>
	);
};

export default ImageTagger;
