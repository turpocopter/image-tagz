import React from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { getJsonTags, getImageData, reinit } from "../imageTaggerSlice";

const Toolbar = () => {
	const jsonTags = useAppSelector(getJsonTags);
	const imageData = useAppSelector(getImageData);
	const dispatch = useAppDispatch();

	const handleClick = (e: any) => {
		if (imageData) {
			e.target.href = `data:text/json;charset=utf-8,${encodeURIComponent(
				JSON.stringify(imageData, null, 2)
			)}`;
		}
	};

	return (
		<div>
			<div className='text-end mb-3'>
				<button className='btn btn-danger' onClick={() => dispatch(reinit())}>
					Discard
				</button>
				&nbsp;&nbsp;&nbsp;
				<a
					className='btn btn-success'
					onClick={handleClick}
					href='./index.html'
					download='taggedImage.json'>
					Download JSON
				</a>
			</div>
			<textarea className='jsonDisplay' rows={15} value={jsonTags} readOnly />
		</div>
	);
};

export default Toolbar;
