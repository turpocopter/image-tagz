import * as React from "react";

import { useAppDispatch } from "../../../app/hooks";
import { setImageData } from "../imageTaggerSlice";

const ImageSelectForm = () => {
	const dispatch = useAppDispatch();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			var reader = new FileReader();
			reader.onloadend = function () {
				if (typeof reader.result === "string") {
					dispatch(setImageData(reader.result));
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
