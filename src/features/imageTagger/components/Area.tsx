import React from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { getTaggedAreaData, selectAreaByIndex } from "../imageTaggerSlice";

interface AreaProps {
	index: number;
}

const Area = ({ index }: AreaProps) => {
	const { origin, width, height, title, isSelected } = useAppSelector((state) =>
		getTaggedAreaData(state, index)
	);
	const dispatch = useAppDispatch();
	const wrapperStyles = {
		left: `${origin.x}%`,
		top: `${origin.y}%`,
		width: `${width}%`,
		height: `${height}%`,
	};
	const areaClasses = ["area"];
	if (isSelected) areaClasses.push("selected");
	return (
		<div
			className='areaWrapper'
			style={wrapperStyles}
			onClick={() => dispatch(selectAreaByIndex(index))}>
			<div className={areaClasses.join(" ")}></div>
		</div>
	);
};

export default Area;
