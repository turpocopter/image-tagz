import * as React from "react";

import { useAppDispatch } from "../../../app/hooks";
import { loadImageAsync } from "../imageTaggerSlice";

const ImageSelectForm = () => {
	const dispatch = useAppDispatch();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			console.log(e.target.files[0]);
			dispatch(loadImageAsync(e.target.files[0]));
		}
	};

	return (
		<div>
			<input
				type='file'
				accept='image/png, image/jpeg'
				onChange={handleChange}
			/>
		</div>
	);
};

export default ImageSelectForm;
