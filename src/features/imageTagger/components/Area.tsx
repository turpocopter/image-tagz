import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
	getTaggedAreaData,
	selectAreaByIndex,
	dragArea,
} from "../imageTaggerSlice";

interface AreaProps {
	index: number;
}

const Area = ({ index }: AreaProps) => {
	const [isMoving, setIsMoving] = useState(false);
	const { origin, width, height, title, isSelected } = useAppSelector((state) =>
		getTaggedAreaData(state, index)
	);
	const dispatch = useAppDispatch();

	const handleMouseDown = () => {
		if (!isSelected) {
			dispatch(selectAreaByIndex(index));
		} else {
			setIsMoving(true);
		}
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (isMoving) {
			console.log(e.movementX, e.movementY);
			dispatch(dragArea({ index, movX: e.movementX, movY: e.movementY }));
		}
	};

	const handleMouseUp = () => {
		setIsMoving(false);
	};

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
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}>
			<div className={areaClasses.join(" ")}></div>
		</div>
	);
};

export default Area;
