import React, { useState, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import AutosizeInput from "react-input-autosize";
import {
	getTaggedAreaData,
	selectAreaByIndex,
	dragArea,
	resizeArea,
	setAreaTitle,
	deleteSelectedArea,
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
	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (isSelected && inputRef.current) {
			setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
		} else {
			inputRef.current = null;
		}
	}, [isSelected]);

	const handleStartDrag = () => {
		if (!isSelected) {
			dispatch(selectAreaByIndex(index));
		} else {
			setIsMoving(true);
		}
	};

	useEffect(() => {
		const handleDrag = (e: any) => {
			if (isMoving) {
				dispatch(dragArea({ index, movX: e.movementX, movY: e.movementY }));
			}
		};
		const handleEndDrag = () => {
			setIsMoving(false);
		};
		if (isMoving) {
			document.body.addEventListener("mousemove", handleDrag);
			document.body.addEventListener("mouseup", handleEndDrag);
			document.body.addEventListener("mouseleave", handleEndDrag);
		}
		return () => {
			document.body.removeEventListener("mousemove", handleDrag);
			document.body.removeEventListener("mouseup", handleEndDrag);
			document.body.removeEventListener("mouseleave", handleEndDrag);
		};
	}, [isMoving, dispatch, index]);

	const handleStartResize = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsResizing(true);
	};

	useEffect(() => {
		const handleResize = (e: any) => {
			if (isResizing) {
				e.stopPropagation();
				dispatch(resizeArea({ index, movX: e.movementX, movY: e.movementY }));
			}
		};
		const handleEndResize = (e: any) => {
			e.stopPropagation();
			setIsResizing(false);
		};
		if (isResizing) {
			document.body.addEventListener("mousemove", handleResize);
			document.body.addEventListener("mouseup", handleEndResize);
			document.body.addEventListener("mouseleave", handleEndResize);
		}
		return () => {
			document.body.removeEventListener("mousemove", handleResize);
			document.body.removeEventListener("mouseup", handleEndResize);
			document.body.removeEventListener("mouseleave", handleEndResize);
		};
	}, [isResizing, dispatch, index]);

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
			onMouseDown={handleStartDrag}>
			<div className={areaClasses.join(" ")}>
				{isSelected && (
					<div className='areaResizer' onMouseDown={handleStartResize} />
				)}
			</div>
			{(isSelected || title !== "") && (
				<div className='areaTag'>
					{isSelected ? (
						<AutosizeInput
							autoFocus
							value={title}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								dispatch(setAreaTitle({ index, title: e.target.value }))
							}
							inputRef={(input) => (inputRef.current = input)}
						/>
					) : (
						<p>{title}</p>
					)}
				</div>
			)}
			{isSelected && (
				<div
					className='areaDelete'
					onClick={(e) => dispatch(deleteSelectedArea(index))}></div>
			)}
		</div>
	);
};

export default Area;
