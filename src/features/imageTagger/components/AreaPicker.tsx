import React, { useState, useRef } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { unselectAllAreas, addAndSelectArea } from "../imageTaggerSlice";

import Point from "../Point";

const pickLocalCoords = (pageCoords: Point, refElt: HTMLElement): Point => {
	const {
		x: mapX,
		y: mapY,
		width: mapW,
		height: mapH,
	} = refElt.getBoundingClientRect();
	const [originX, originY] = [
		(100 * (pageCoords.x - mapX)) / mapW,
		(100 * (pageCoords.y - mapY)) / mapH,
	];
	return { x: originX, y: originY };
};

const AreaPicker = () => {
	const [startPoint, setStartPoint] = useState<Point | undefined>();
	const [endPoint, setEndPoint] = useState<Point | undefined>();
	const dispatch = useAppDispatch();
	const mapRef = useRef<any>();

	const handleMouseDown = (e: React.MouseEvent) => {
		if (!startPoint && e.target instanceof HTMLElement) {
			setStartPoint(
				pickLocalCoords({ x: e.clientX, y: e.clientY }, mapRef.current)
			);
			setEndPoint(undefined);
			dispatch(unselectAllAreas());
		}
	};

	const handleMouseMove = (e: React.MouseEvent & { target: any }) => {
		if (startPoint && e.target instanceof HTMLElement) {
			console.log(e.target, e.clientX, e.clientY);
			setEndPoint(
				pickLocalCoords({ x: e.clientX, y: e.clientY }, mapRef.current)
			);
		}
	};

	const handleMouseUp = (e: React.MouseEvent) => {
		if (startPoint && endPoint && e.target instanceof HTMLElement) {
			dispatch(
				addAndSelectArea({
					origin: {
						x: Math.min(startPoint.x, endPoint.x),
						y: Math.min(startPoint.y, endPoint.y),
					},
					width: Math.abs(startPoint.x - endPoint.x),
					height: Math.abs(startPoint.y - endPoint.y),
				})
			);
			setStartPoint(undefined);
			setEndPoint(undefined);
		}
	};

	return (
		<div
			className='areaPicker'
			ref={mapRef}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}>
			{startPoint && endPoint && (
				<div
					className='area initialized'
					style={{
						left: `${Math.min(startPoint.x, endPoint.x)}%`,
						top: `${Math.min(startPoint.y, endPoint.y)}%`,
						width: `${Math.abs(startPoint.x - endPoint.x)}%`,
						height: `${Math.abs(startPoint.y - endPoint.y)}%`,
					}}
				/>
			)}
		</div>
	);
};

export default AreaPicker;
