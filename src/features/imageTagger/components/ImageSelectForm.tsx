import * as React from "react";

import { useAppDispatch } from "../../../app/hooks";
import { setImageData, setImageDimensions } from "../imageTaggerSlice";

const ImageSelectForm = () => {
	const dispatch = useAppDispatch();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			var reader = new FileReader();
			reader.onloadend = () => {
				if (typeof reader.result === "string") {
					console.log(reader.result);
					dispatch(setImageData(reader.result));
					const image = new Image();
					image.src = reader.result;
					image.onload = () => {
						dispatch(
							setImageDimensions({ width: image.width, height: image.height })
						);
					};
				}
			};
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	return (
		<div>
			<input
				type='file'
				//accept='image/png, image/jpg'
				onChange={handleChange}
			/>
		</div>
	);
};

export default ImageSelectForm;
