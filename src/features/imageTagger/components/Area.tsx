import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import AutosizeInput from "react-input-autosize";
import {
	getTaggedAreaData,
	selectAreaByIndex,
	dragArea,
	resizeArea,
	setAreaTitle,
} from "../imageTaggerSlice";

interface AreaProps {
	index: number;
}

const Area = ({ index }: AreaProps) => {
	const [isMoving, setIsMoving] = useState(false);
	const [isResizing, setIsResizing] = useState(false);
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
			dispatch(dragArea({ index, movX: e.movementX, movY: e.movementY }));
		}
	};

	const handleMouseUp = () => {
		setIsMoving(false);
	};

	const handleStartResize = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsResizing(true);
	};

	const handleResize = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (isResizing) {
			dispatch(resizeArea({ index, movX: e.movementX, movY: e.movementY }));
		}
	};

	const handleEndResize = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsResizing(false);
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
			<div className={areaClasses.join(" ")}>
				{isSelected && (
					<div
						className='areaResizer'
						onMouseDown={handleStartResize}
						onMouseMove={handleResize}
						onMouseUp={handleEndResize}
					/>
				)}
			</div>
			<div className='areaTag'>
				{isSelected ? (
					<AutosizeInput
						value={title}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							dispatch(setAreaTitle({ index, title: e.target.value }))
						}
					/>
				) : (
					<p>{title}</p>
				)}
			</div>
		</div>
	);
};

export default Area;
