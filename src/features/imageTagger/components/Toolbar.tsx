import React from "react";
import { FaTrash, FaFileDownload } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
	getJsonTags,
	getTaggedAreasLength,
	getImageData,
	reinit,
} from "../imageTaggerSlice";

const Toolbar = () => {
	const jsonTags = useAppSelector(getJsonTags);
	const imageData = useAppSelector(getImageData);
	const hasTags = useAppSelector(getTaggedAreasLength) > 0;
	const dispatch = useAppDispatch();

	const handleClick = (e: any) => {
		if (imageData) {
			e.target.href = `data:text/json;charset=utf-8,${encodeURIComponent(
				JSON.stringify(imageData, null, 2)
			)}`;
		}
	};

	return (
		<div className='toolbar'>
			<div className='text-end mb-3'>
				{hasTags && (
					<a
						className='btn btn-success'
						onClick={handleClick}
						href='./index.html'
						download='taggedImage.json'>
						<FaFileDownload size={18} /> Download JSON
					</a>
				)}
				&nbsp;&nbsp;&nbsp;
				<button className='btn btn-danger' onClick={() => dispatch(reinit())}>
					<FaTrash size={18} /> Discard
				</button>
			</div>
			<textarea className='jsonDisplay' rows={15} value={jsonTags} readOnly />
		</div>
	);
};

export default Toolbar;
